import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";
import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";

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
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Техт</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.tempEvent.text" >
                </md-input-container>
                 </md-input-container>
                    <md-input-container class="md-block">
                    <label>Техт</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.tempEvent.start.value" >
                </md-input-container>
                 </md-input-container>
                    <md-input-container class="md-block">
                    <label>Техт</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.tempEvent.end.value" >
                </md-input-container>
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

class EditDialogController {

    static $inject = ['$mdDialog', 'tempEvent'];

    private tempEvent:IScheduler;
    private originaltempEvent:IScheduler;

    constructor(private $mdDialog:ng.material.IDialogService, tempEvent:IScheduler) {
        this.tempEvent = angular.copy( tempEvent );
        this.originaltempEvent = tempEvent;
    }

    save() {

        angular.extend( this.originaltempEvent, this.tempEvent );
        this.$mdDialog.hide( {action: "save", event: this.originaltempEvent} );
    }

    deleteEvent() {
        this.$mdDialog.hide( {action: "delete", event: this.originaltempEvent} );
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterSchedulerComponentController {

    static $inject = ["$log", '$timeout', "$mdDialog", "$scope", MasterResourceName, "$routeParams"];

    master:IMaster;
    masterId:string;
    events:IScheduler[];
    weekConfig:any;
    navigatorConfig:any;
    tempEvent:IScheduler;
    tasks:ITask[];
    photo:string;
    mname:string;

    constructor(private $log:ng.ILogService, private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService,
                private $scope:ng.IScope, private MasterResource:IMasterResource, private $routeParams:ng.route.IRouteParamsService) {
        this.events = [];
        if (this.$routeParams["id"]) {
            this.masterId = this.$routeParams["id"]
        }
        this.init();
    }

    init() {

        this.initWeekConfig();
        this.initNavigatorConfig();
        this.loadEvents( new Date() );
    }

    startAndEndOfWeek(date):Date[] {
        var now = date ? new Date( date ) : new Date();
        now.setHours( 0, 0, 0, 0 );
        var monday = new Date( now );
        monday.setDate( monday.getDate() - monday.getDay() + 1 );
        var sunday = new Date( now );
        sunday.setDate( sunday.getDate() - sunday.getDay() + 7 );
        return [monday, sunday];
    }

    loadEvents(start) {
        if (this.masterId) {
            var days = this.startAndEndOfWeek( start );
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
                this.$mdDialog.show( {
                    template: editOrderDialogTemplate,
                    controller: EditDialogController,
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        tempEvent: {
                            id: args.e.id(),
                            text: args.e.text(),
                            start: args.e.start(),
                            end: args.e.end()
                        }
                    },
                    parent: angular.element( document.body ),

                } ).then( (result) => {

                    this.handleDialogResult( result );
                } );
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
export let MasterSchedulerComponentOptions = {
    controller: MasterSchedulerComponentController,
    template: template,
    bindings: {
        mname: "=",
        photo: '='
    }
};