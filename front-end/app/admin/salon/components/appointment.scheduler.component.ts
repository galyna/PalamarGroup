/**
 * Created by Galyna on 06.10.2016.
 */
import {MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import IMasterFavor = pg.models.IMasterFavor;
import {ISchedulerScope} from "./master.scheduler";

const template = `
 <div layout="row" class="master-scheduler" layout-xs="column">
                <div hide show-gt-xs="true"  layout="row" layout-align="center center">
                    <daypilot-navigator  style=" width: 280px" id="navi"
                                        daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>
                   
                </div>
                <div hide-gt-xs="true" class="md-padding " layout="row" layout-align="center center">
                   
                    <daypilot-navigator  style=" width: 280px" id="navis"
                                        daypilot-config="$ctrl.navigatorSmallConfig"></daypilot-navigator>
                </div>
                <div flex class="md-padding ">
                    <daypilot-calendar id="week" daypilot-config="$ctrl.weekConfig"
                                       daypilot-events="$ctrl.events"></daypilot-calendar>
                </div>

            </div>`;

export class AppointmentSchedulerComponentController {

    static $inject = ["$log", '$timeout', "$mdDialog", MasterResourceName, "$routeParams", '$scope'];

    masterId:any;
    master:string;
    events:IScheduler[];
    weekConfig:any;
    navigatorConfig:any;
    navigatorSmallConfig:any;
    tasks:ITask[];
    appointment:any;


    constructor(private $log:ng.ILogService, private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService,
                private MasterResource:IMasterResource,
                private $routeParams:ng.route.IRouteParamsService, private $scope:ISchedulerScope) {
        this.events = [];
        this.tasks = [];


    }

    $onChanges(changesObj) {
        console.log(changesObj);
        if (changesObj.master.currentValue && changesObj.master.previousValue!=changesObj.master.currentValue) {
            this.masterId = changesObj.master.currentValue;
            this.init();
        }
    };

    init() {

        this.initWeekConfig();
        this.initNavigatorConfig();
        this.initNavigatorSmallConfig();
        this.loadEvents( new Date() );
    }


    getStartAndEndOfWeek(date):Date[] {
        date = new Date( date );
        date.setUTCHours(0);
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        var start = new Date( date.setDate( diff ) );
        var end = new Date( date.setDate( start.getDate() + 7 ) );
        return [start, end];
    }

    loadEvents(start) {
        if (this.masterId) {
            var days = this.getStartAndEndOfWeek( start );
            var params = {
                id: this.masterId,
                start: days[0].toISOString(),
                end: days[1].toISOString(),
            }
            this.MasterResource.getTasks( params ).$promise.then( (tasks) => {
                this.tasks = tasks;
                this.events = this.tasks.map( (task)=> {
                    return angular.copy( task.scheduler );
                } );

            } ).catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
        }
    }

    initWeekConfig() {
        this.weekConfig = {
            visible: true,
            viewType: "Week",
            api: 2,
            angularAutoApply: true,
            locale: "ru-ru",
            cellHeight: "30",
            businessBeginsHour: "10",
            businessEndsHour: "19",
            hideUntilInit: true,
            headerDateFormat: 'dd.MM',
            eventMoveHandling: 'Disabled',
            heightSpec: 'BusinessHours',
            onTimeRangeSelect: (args)=> {
                var params = {
                    appointment: angular.copy(this.appointment),
                    scheduler: {
                        start: args.start.toString(),
                        end: args.end.toString(),
                        id: DayPilot.guid()
                    }
                };
                params.appointment.favors = this.getFavors();
                this.updateTaskText( params );
                this.MasterResource.addTask( {id: this.masterId}, params ).$promise.then( (task) => {
                    this.tasks.push( task );
                    this.events.push( task.scheduler );
                    this.$scope.week.update();
                } );

            },
            onEventResize: (args)=> {
                var event = {
                    id: args.e.id(),
                    start: args.newStart.toString(),
                    end: args.newEnd.toString(),
                    text: args.e.text(),
                    borderColor: args.e.borderColor,
                    barColor: args.e.barColor,
                };
                var originalTask;

                var tasks = this.tasks.filter( (task)=> {
                    return task != null && task.scheduler.id === event.id;
                } );
                if (tasks.length > 0 && event) {
                    var task = tasks[0];
                    originalTask = angular.copy( task );
                    task.scheduler = event;
                    this.MasterResource.updateTask( {id: this.masterId}, task ).$promise.then( (newTask) => {
                        this.tasks.splice( this.tasks.indexOf( task ), 1, newTask );
                    } ) .catch( (err)=> {
                        this.revertResize( originalTask );
                        this.$scope.week.update();
                        this.$log.error( err );
                        this.showErrorDialog();
                    } );
                }
            },
            onEventClick: (args)=> {

            }
        };
    }

    initNavigatorSmallConfig() {
        this.navigatorSmallConfig = {
            selectMode: "week",
            showMonths: 1,
            skipMonths: 1,
            locale: "ru-ru",
            cellHeight: "40",
            cellWidth: "40",
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents( args.day );
            }
        };
    }

    initNavigatorConfig() {
        this.navigatorConfig = {
            selectMode: "week",
            showMonths: 2,
            skipMonths: 2,
            locale: "ru-ru",
            cellHeight: "40.2",
            cellWidth: "30",
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents( args.day );
            }
        };
    }

    getFavors() {
        return this.appointment.favors.map( (mf)=> {
            return {
                name: mf.favor.name,
                id: mf._id,
                price: mf.price,
                photo:mf.favor.photo.url
            }
        } );

    }

    updateTaskText(task) {
        task.scheduler.text = ``;
        if (!task.appointment.name) {
            task.scheduler.text = task.scheduler.text + `<div>Замовника не вказано</div>`;
        } else {
            task.scheduler.borderColor = "blue";
            task.scheduler.barColor = "blue";
            task.scheduler.text = `<div><span>Замовник:</span><span> ${task.appointment.name}</span></div>`;
        }

        if (task.appointment.favors.length == 0) {
            task.scheduler.text = task.scheduler.text + `<div>Послуги не вказані</div>`;

        } else {
            var favors = task.appointment.favors.map( (f)=> {
                return f.name;
            } ).join( ' ' );
            task.scheduler.text = task.scheduler.text + `<div><span>Послуги:</span><span> ${favors}</span></div>`;
        }
        if (task.appointment.favors.length == 0 || !task.appointment.name) {
            task.scheduler.borderColor = "red";
            task.scheduler.barColor = "red";
        }

        if (task.appointment.isDayOff) {
            task.scheduler.text = `<div>Час без замовлень</div>`;
            task.scheduler.borderColor = "grey";
            task.scheduler.barColor = "grey";
        }

    }

    updateMaster(task:ITask) {
        this.updateTaskText( task );

        this.MasterResource.updateTask( {id: this.masterId}, task ).$promise.then( (newTask) => {
            this.tasks.splice( this.tasks.indexOf( task ), 1, newTask );
            var tempEvents = this.events.filter( (e)=> {
                return e.id == newTask.scheduler.id;
            } )

            if (tempEvents.length > 0 && event) {

                this.events.splice( this.events.indexOf( tempEvents[0] ), 1, newTask.scheduler );
            }
        } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } );


    }

    updateMasterOnResize(event) {
        var originalTask;
        var tasks = this.tasks.filter( (task)=> {
            return task != null && task.scheduler.id === event.id;
        } );
        if (tasks.length > 0 && event) {
            var task = tasks[0];
            originalTask = task;
            task.scheduler = event;
            this.MasterResource.updateTask( {id: this.masterId}, task ).$promise.then( (newTask) => {
                this.tasks.splice( this.tasks.indexOf( task ), 1, newTask );
            } ) .catch( (err)=> {
                this.revertResize( originalTask );
                this.$log.error( err );
                this.showErrorDialog();
            } );
        }
    }

    revertResize(originalTask) {

        var events = this.events.filter( (e)=> {
            return e.id == originalTask.scheduler.id;
        } )
        if (events.length > 0) {
            this.events.splice( this.events.indexOf( events[0] ), 1, originalTask.scheduler );

        }

    }


    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }

}

export let AppointmentSchedulerComponentName = 'pgAppointmentScheduler';
export let AppointmentSchedulerComponentOptions:ng.IComponentOptions = {
    controller: AppointmentSchedulerComponentController,
    template: template,
    bindings: {
        "appointment": '<',
        'master':'<'
    }
};
