import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import IMasterFavor = pg.models.IMasterFavor;

const template = `<md-list flex ng-if="$ctrl.photo">
    <md-list-item class="md-1-line">
        <img ng-src="{{$ctrl.photo}}" class="md-avatar" alt="{{$ctrl.photo}}"/>
        <div class="md-list-item-text" layout="column">
            <h3>{{::$ctrl.mname}}</h3>
        </div>
    </md-list-item>
</md-list>
<div layout="row" layout-xs="column">
    <div class="md-padding ">
        <daypilot-navigator style=" width: 280px" id="navi"
                            daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>
    </div>
    <div flex class="md-padding ">
        <daypilot-calendar id="week" daypilot-config="$ctrl.weekConfig"
                           daypilot-events="$ctrl.events"></daypilot-calendar>
    </div>

</div>`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
  
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2 >Редагувата замовлення</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
            
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">       
                  <div  layout-gt-sm="row" layout="column">
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">
                        <md-subheader class="md-no-sticky">Інформація від замовника
                        </md-subheader>
                        <md-input-container class="md-block">
                            <label>Замовник</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.name">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Телфон</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.phone">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Email</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.email">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Коментар замовника</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.comment"/>
                        </md-input-container>
                    </div>
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">
                        <md-subheader class="md-no-sticky">Майстер та послуги
                        </md-subheader>

                        <md-input-container class="md-block">
                            <label>Майстер</label>
                            <md-select ng-model="$ctrl.appointment.master" ng-change="$ctrl.changeMaster(id)">
                                <md-option ng-repeat="master in $ctrl.masters" ng-value="master._id">
                                    {{ master.name }}
                                </md-option>
                            </md-select>
                        </md-input-container>

                        <md-input-container class="md-block">
                            <md-subheader class="md-no-sticky">Послуги</md-subheader>
                            <div ng-repeat="service in $ctrl.appointment.favors">

                                <div layout="row">
                                    <div class="md-margin md-padding " id="prokgram" name="program">
                                        {{service.favor.name}}
                                    </div>
                                    <div class="md-margin md-padding " id="program" name="program">{{service.price}}
                                    </div>
                                    <md-button ng-if="::$root.it.can('modifySalon')" class="md-icon-button"
                                               ng-click="$ctrl.deleteService(service)">
                                        <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                    </md-button>
                                </div>
                            </div>
                        </md-input-container>


                        <md-subheader class="md-no-sticky">Додати послугу
                        </md-subheader>

                        <md-select ng-model="$ctrl.newService" ng-model-options="{trackBy: '$value.favor._id'}">
                            <md-option ng-repeat="favor in $ctrl.favors" ng-value="favor">
                                {{ favor.favor.name }}
                            </md-option>
                        </md-select>
                        <md-input-container layout="row" class="md-block">
                            <label for="newProgram">ЦІНА</label>
                            <input type="number" ng-model="$ctrl.newService.price"/>

                        </md-input-container>
                        <md-button ng-disabled="!$ctrl.newService.favor" class=" " ng-click="$ctrl.addService()">
                            Додати
                        </md-button>

                    </div>
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">

                        <md-subheader class="md-no-sticky">Адміністративна частина
                        </md-subheader>
                        <md-input-container layout="row" class="md-block">
                            <md-checkbox ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.answered">
                                Замовнику передзвонили
                            </md-checkbox>
                        </md-input-container>
                        <md-input-container layout="row" class="md-block">
                            <md-checkbox ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.booked">
                                Участь у заході підтверджено
                            </md-checkbox>
                        </md-input-container>

                        <md-input-container>
                            <label>Коментар адміністратора</label>
                            <textarea ng-disabled="::!$root.it.can('modifySalon')"
                                      ng-model="$ctrl.appointment.admin_comment"></textarea>
                        </md-input-container>

                       

                    </div>
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifySalon')">
         <span flex></span>
         
                        <md-button ng-click="$ctrl.deleteEvent()" aria-label="cancel">
                Видалити
            </md-button>
                        <md-button ng-click="$ctrl.save()" aria-label="save">
                Зберегти
            </md-button>
           
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>

        </md-dialog-actions>

</md-dialog>
`;

export interface ISchedulerScope extends ng.IScope {
    week:any;
}
class EditDialogController {


    static $inject = ['$mdDialog',AppointmentResourceName, 'task'];
    private masters:IMaster[];
    private favors:any[];
    private newService:IMasterFavor;
    private appointment:IAppointment;
    private originalAppointment:IAppointment;


    constructor(private $mdDialog:ng.material.IDialogService,private AppointmentResource:IAppointmentResource, task) {
        this.appointment = this.AppointmentResource.get({id: task.appointment},{populate: 'favors.favor'} );
        this.appointment.$promise.then( (appointment) => {
            this.originalAppointment = appointment;
            this.masters.forEach( (m)=> {
                if (m._id === this.appointment.master) {
                    this.favors = m.services;
                }
            } )
            }
        );


    }
    AddToCalendar(){}
    deleteService(favor) {
        this.appointment.favors.splice( this.appointment.favors.indexOf( favor ), 1 )
    }

    addService(favor:IMasterFavor) {
        this.appointment.favors.push( this.newService )
    }


    changeMaster(master) {
        if (master != this.appointment.master) {
            this.appointment.favors = [];
            this.masters.forEach( (m)=> {
                if (m._id === this.appointment.master) {
                    this.favors = m.services;
                    return;
                }
            } )
        }
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend( this.originalAppointment, this.appointment );
            this.$mdDialog.hide( {action: "save",appointment : this.originalAppointment});
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterSchedulerComponentController {

    static $inject = ["$log", '$timeout', "$mdDialog", "$scope", MasterResourceName, "$routeParams",AppointmentResourceName];

    master:IMaster;
    masterId:string;
    events:IScheduler[];
    weekConfig:any;
    navigatorConfig:any;
    tempEvent:IScheduler;
    tasks:ITask[];
    photo:string;
    mname:string;
    masterid:string;
    mode:string;
    appointment:IAppointment;

    constructor(private $log:ng.ILogService, private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService,
                private $scope:ISchedulerScope, private MasterResource:IMasterResource, private $routeParams:ng.route.IRouteParamsService,
                private AppointmentResource:IAppointmentResource) {
        this.events = [];
        this.tasks = [];
        this.mode='master';
        if (this.$routeParams["id"]) {
            this.masterId = this.$routeParams["id"]
        } else {
            this.masterId = this.masterid;
            this.mode='appointment';
        }
        this.init();
    }

    init() {
        switch (this.mode) {
            case "appointment":
                this.masterId = this.masterid;
                this.initWeekAppointmentConfig();
                break;
            case "master":
                this.appointment=new this.AppointmentResource();
                if (this.$routeParams["id"]) {
                    this.masterId = this.$routeParams["id"]
                }
                this.initWeekConfig();

                break;
            default:
                throw "unknown action";
        }
        this.initWeekConfig();
        this.initNavigatorConfig();
        this.loadEvents( new Date() );
    }


    getStartAndEndOfWeek(date):Date[] {
        date = new Date( date );
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
            cellHeight: "36",
            businessEndsHour: "19",
            hideUntilInit: true,
            eventMoveHandling: 'Disabled',
            heightSpec: 'BusinessHours',
            onTimeRangeSelect: (args)=> {
                var params = {
                    scheduler: {
                        start: args.start.toString(),
                        end: args.end.toString(),
                        text: "New event",
                        id: DayPilot.guid()
                    }
                };
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
                    text: args.e.text()
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
                var tasks = this.tasks.filter( (task)=> {
                    return task != null && task.scheduler.id === args.e.id();
                } );
                if (tasks.length > 0 ) {
                    var task=tasks[0];
                   if(!task.appointment) {
                       this.createAppointment(task);
                   }else {
                       this.createEditDialod(task);
                   }
            }}
        };
    }

    initWeekAppointmentConfig() {
        this.weekConfig = {
            visible: true,
            viewType: "Week",
            api: 2,
            angularAutoApply: true,
            locale: "ru-ru",
            cellHeight: "36",
            businessEndsHour: "19",
            hideUntilInit: true,
            eventMoveHandling: 'Disabled',
            heightSpec: 'BusinessHours',
            onTimeRangeSelect: (args)=> {
                var params = {
                    scheduler: {
                        start: args.start.toString(),
                        end: args.end.toString(),
                        text: "New event",
                        id: DayPilot.guid()
                    }
                };
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
                    text: args.e.text()
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

    initNavigatorConfig() {
        this.navigatorConfig = {
            selectMode: "week",
            showMonths: 3,
            skipMonths: 3,
            locale: "ru-ru",
            cellHeight: "34",
            cellWidth: "30",
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents( args.day );
            }
        };
    }

    createAppointment(task) {
        this.appointment.$save(  )
            .then( (appointment) => {
                task.appointment=appointment;
                this.MasterResource.updateTask( {id: this.masterId}, task ).$promise.then( (newTask) => {
                    this.tasks.splice( this.tasks.indexOf( task ), 1, newTask );
                    this.createEditDialod(newTask);
                } ).catch( (err)=> {
                    this.$log.error( err );
                    this.showErrorDialog();
                } );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }

    createEditDialod(task) {
        this.$mdDialog.show( {
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                task: task
            },
            parent: angular.element( document.body ),

        } ).then( (result) => {

            this.handleDialogResult( result );
        } );
    }

    handleDialogResult(result) {
        switch (result.action) {
            case "delete":
                this.deleteMasterTask( result.event );
                break;
            case "save":
                this.updateMaster( result.event );

                break;
            default:
                throw "unknown action";
        }

    }

    updateMaster(event) {
        var tasks = this.tasks.filter( (task)=> {
            return task != null && task.scheduler.id === event.id;
        } );
        if (tasks.length > 0 && event) {
            var task = tasks[0];
            task.scheduler.text = event.text;
            task.scheduler.start = event.start.value;
            task.scheduler.end = event.end.value;
            ;
            this.MasterResource.updateTask( {id: this.masterId}, task ).$promise.then( (newTask) => {
                this.tasks.splice( this.tasks.indexOf( task ), 1, newTask );
                var tempEvents = this.events.filter( (e)=> {
                    return e.id == event.id;
                } )

                if (tempEvents.length > 0 && event) {
                    this.events.splice( this.events.indexOf( tempEvents[0] ), 1, newTask.scheduler );
                }
            } ).catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
        }

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

    deleteMasterTask(event) {

        var tasks = this.tasks.filter( (t)=> {
            return t.scheduler.id == event.id;
        } );
        if (tasks.length > 0) {
            var deleteTask = tasks[0];
            this.MasterResource.deleteTask( {id: this.masterId, taskId: deleteTask._id} ).$promise.then( (task) => {
                this.tasks.splice( this.tasks.indexOf( deleteTask ), 1 );
                var events = this.events.filter( (e)=> {
                    return e.id == event.id;
                } )
                if (events.length > 0 && event) {
                    this.events.splice( this.events.indexOf( events[0] ), 1 );
                }
            } ).catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();

            } );
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

export let MasterSchedulerComponentName = 'pgMasterScheduler';
export let MasterSchedulerComponentOptions:ng.IComponentOptions = {
    controller: MasterSchedulerComponentController,
    template: template,
    bindings: {
        'mname': "=",
        'photo': '=',
        'masterid': "=",
        'mode':'=',
        "appointment":'='
    }
};