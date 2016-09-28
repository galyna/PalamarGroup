import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";
import {IMaster, MasterResourceName, IMasterResource} from "../../../resources/master.resource";

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

export class MasterSchedulerComponentController {

    static $inject = ['$timeout', "$mdDialog", "$scope", MasterResourceName, "$routeParams"];


    master:IMaster;
    model:IMaster;
    events:any[];
    weekConfig:any;
    currentEvent:any;
    weekControl:any;
    navigatorConfig:any;
    tempEvents:{id:string}[];
    tempEvent:{id:string,text:string,start:any,end:any};

    constructor(private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService,
                private $scope:ng.IScope, private MasterResource:IMasterResource, private $routeParams:ng.route.IRouteParamsService) {
        this.events = [];

        if (this.$routeParams["id"]) {
            this.MasterResource.get( {id: this.$routeParams["id"], populate: 'services.favor'} ).$promise
                .then( (master) => {

                    this.master = master;
                    this.init()
                } );
        }

    }


    initWeekConfig() {
        this.weekConfig = {
            visible: true,
            viewType: "Week",
            angularAutoApply: true,
            onTimeRangeSelect: (args)=> {
                this.currentEvent = {
                    start: args.start.toString(),
                    end: args.end.toString(),
                    text: "New event",
                    id: DayPilot.guid()
                };

                this.events.push( this.currentEvent );
                this.weekControl = this.$scope.week;
                this.weekControl.update();
            },

            locale: "ru-ru",
            cellHeight: "36",
            businessEndsHour: "19",
            hideUntilInit: true,
            heightSpec: 'BusinessHours',
            onEventClick: (args)=> {
                this.$mdDialog.show( {
                    template: editOrderDialogTemplate,
                    controller: MasterSchedulerComponentController,
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        tempEvents: this.events,
                        tempEvent: {
                            id: args.e.id(),
                            text: args.e.text(),
                            start: args.e.start(),
                            end: args.e.end()
                        }
                    },
                    parent: angular.element( document.body ),

                } ).then( (events) => {
                    this.events = events;
                    this.weekControl.update()
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

    addEvet(e) {

        //  this.events = [];
    }

    init() {
        this.initWeekConfig();

        this.initNavigatorConfig();


    }

    saveEvent() {
        var event = this.tempEvents.filter( (e)=> {
            return e.id == this.tempEvent.id
        } )
        if (event.length > 0) {
            this.tempEvents.splice( this.tempEvents.indexOf( event[0] ), 1, this.tempEvent );
        }
        this.$mdDialog.hide( this.tempEvents );

        this.$mdDialog.cancel();
    }

    deleteEvent() {

        this.tempEvents.splice( this.tempEvents.indexOf( this.currentEvent ), 1 );
        this.$mdDialog.hide( this.tempEvents );

        this.$mdDialog.cancel();
    }


    cancel() {
        this.$mdDialog.cancel();
    }

    loadEvents() {
        // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
        this.$timeout( function () {
            //   var params = {
            //    start: this.week.visibleStart().toString(),
            //    end: this.week.visibleEnd().toString()
            // }
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