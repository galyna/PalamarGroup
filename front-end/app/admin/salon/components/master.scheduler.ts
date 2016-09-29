import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";
import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";

const template = `<div  layout="row" layout-xs="column">
<div class="md-padding " >
    <daypilot-navigator style=" width: 280px" id="navi"
                        daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>
</div>
<div flex class="md-padding ">
    <daypilot-calendar id="week" daypilot-config="$ctrl.weekConfig" daypilot-events="$ctrl.events"></daypilot-calendar>
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
                        <md-button ng-click="$ctrl.saveEvent()" aria-label="cancel">
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

    save($form:ng.IFormController) {

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

    static $inject = ['$timeout', "$mdDialog", "$scope", MasterResourceName, "$routeParams"];


    master:IMaster;
    events:IScheduler[];
    weekConfig:any;
    weekControl:any;
    navigatorConfig:any;
    tempEvent:IScheduler;

    constructor(private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService,
                private $scope:ng.IScope, private MasterResource:IMasterResource, private $routeParams:ng.route.IRouteParamsService) {
        this.events = [];
        this.init();
    }

    init() {
        this.initEvents()
        this.initWeekConfig();
        this.initNavigatorConfig();
    }

    initEvents() {
        if (this.$routeParams["id"]) {
            this.MasterResource.get( {id: this.$routeParams["id"], populate: 'tasks'} ).$promise
                .then( (master) => {
                    this.master = master;
                    this.events = this.master.tasks? this.master.tasks.filter( (task)=> {return task != null;}).map( (task)=> {return task.scheduler;} ):[];

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
                this.weekControl = this.$scope.week;
                this.MasterResource.addTask( {id: this.master._id}, params ).$promise.then( (master) => {
                    this.master = master;
                    this.events = this.master.tasks.filter( (task)=> {return task != null;}).map( (task)=> {return task.scheduler;} )
                    this.weekControl.update();
                } );


            },
            onEventResize: (args)=> {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };
                var event = this.events.filter( (e)=> {
                    return e.id == args.e.id()
                } )
                if (event.length > 0) {
                    // event.start=args.newStart;
                    //  event.start=args.newStart;
                    //  this.tempEvents.splice( this.tempEvents.indexOf( event[0] ), 1, this.tempEvent );
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
    };

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
                this.loadEvents();
            }
        };
    }

    updateMaster(result) {
        this.MasterResource.updateTask( {id: this.master._id}, result.event ).$promise.then( (task) => {

            var event = this.events.filter( (e)=> {
                return e.id == result.event.id;
            } )
            if (event.length > 0 && result.event) {
                //this.tempEvents.splice( this.tempEvents.indexOf( event[0] ), 1, result.event.scheduler );
            }
        } );
    }

    deleteMasterTask(result) {

        var tasks = this.master.tasks.filter( (t)=> {
            return t.scheduler.id == result.event.id;
        } );
        if (tasks.length > 0) {
            var deleteTask = tasks[0];
            this.MasterResource.deleteTask( {id: this.master._id, taskId: deleteTask._id} ).$promise.then( (task) => {
                this.master.tasks.splice( this.master.tasks.indexOf( deleteTask ), 1 );
                var events = this.events.filter( (e)=> {
                    return e.id == result.event.id;
                } )
                if (events.length > 0 && result.event) {
                    this.events.splice( this.events.indexOf( events[0] ), 1 );
                }
            } );
        }
    }


    handleDialogResult(result) {
        switch (result.action) {
            case "delete":
                this.deleteMasterTask( result );
                break;
            case "save":
                this.updateMaster( result );

                break;
            default:
                throw "unnovn action";
        }
        //  this.events = [];
    }


    loadEvents() {
        // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
        this.$timeout( function () {
            //   var params = {
            //     start: this.week.visibleStart().toString(),
            //     end: this.week.visibleEnd().toString()
            // }toString
            //  $http.post('@Url.Action("Events", "Backend")', params).success(function (data) {
            //     $scope.events = data;
            // });


        } );
    }

}

export let MasterSchedulerComponentName = 'pgMasterSceduler';
export let MasterSchedulerComponentOptions = {
    controller: MasterSchedulerComponentController,
    template: template
};