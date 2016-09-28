import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";

const template = `<div style="float:left; width: 170px">
        <daypilot-navigator style="float:left; width: 170px" id="navi" daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>
    </div>
    <div style="margin-left: 170px">
   <div class="space">
            <button ng-click="$ctrl.showDay()">Day</button>
            <button ng-click="$ctrl.showWeek()">Week</button>
        </div>
        <daypilot-calendar id="day" daypilot-config="$ctrl.dayConfig" daypilot-events="$ctrl.events"></daypilot-calendar>
 <daypilot-calendar id="week" daypilot-config="$ctrl.weekConfig" daypilot-events="$ctrl.events"></daypilot-calendar>
    </div>
      
      New event:
      <button ng-click="$ctrl.addEvent()">Add</button>
  </div>
  <div>
      First event:
      <button ng-click="$ctrl.moveEvent()">Move</button>
      <button ng-click="$ctrl.renameEvent()">Rename</button>
  </div>
 
  <div>
      Events array (debug):
      <div ng-repeat="item in $ctrl.events">
          {{item}}
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
               
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifySalon')">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
           
        </md-dialog-actions>

</md-dialog>
`;
class EditDialogController {

    static $inject = ['$mdDialog'];


    constructor(private $mdDialog:ng.material.IDialogService) {

    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterScedulerComponentController {

    static $inject = ['$timeout',"$mdDialog"];


    events:any[];
    weekConfig:any;
    dayConfig:any;
    navigatorConfig:any;

    constructor(private $timeout:ng.ITimeoutService, private $mdDialog:ng.material.IDialogService) {
        this.events = [];
        this.events.push(
            {
                start: new DayPilot.Date( "2016-09-27T10:00:00" ),
                end: new DayPilot.Date( "2016-09-27T12:00:00" ),
                id: DayPilot.guid(),
                text: "Simple Event"
            }
        );

        this.weekConfig = {
            visible: false,
            viewType: "Week",
            angularAutoApply:true,

            onTimeRangeSelected:(args)=>  {
                var params = {
                    start: args.start.toString(),
                    end: args.end.toString(),
                    text: "New event"
                };

                //$http.post('@Url.Action("Create", "Backend")', params).success(function (data) {
                this.events.push( {
                    start: args.start,
                    end: args.end,
                    text: "New Week",
                    id: DayPilot.guid(),
                } );
                //});
            },
            onEventMove: (args) => {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };

                this.$mdDialog.show( {
                    template: editOrderDialogTemplate,
                    controller: MasterScedulerComponentController,
                    controllerAs: '$ctrl',
                    bindToController: true,
                    parent: angular.element( document.body ),

                } ).then( () =>{});
                //$http.post('@Url.Action("Move", "Backend")', params);
            },
            onEventClick: (args) => {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };

                //$http.post('@Url.Action("Move", "Backend")', params);
            },
            onEventResize: (args) => {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };

                // $http.post('@Url.Action("Move", "Backend")', params);
            },
            onEventClicked: (args)=> {
                this.$mdDialog.show( {
                    template: editOrderDialogTemplate,
                    controller: EditDialogController,
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {

                    },
                    parent: angular.element( document.body ),

                } ).then( () => this.saveOrder( ) );
            }
        };

        this.dayConfig = {
            viewType: "Day",
            startDate: new DayPilot.Date( "2016-09-27T10:00:00" ),
            onTimeRangeSelected: (args)=>  {
                var params = {
                    start: args.start.toString(),
                    end: args.end.toString(),
                    text: "New event"
                };

                // $http.post('@Url.Action("Create", "Backend")', params).success(function (data) {
                this.events.push( {
                    start: args.start,
                    end: args.end,
                    text: "New event",
                    id: DayPilot.guid(),
                } );

            },
            onEventMove:(args) => {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };

                // $http.post('@Url.Action("Move", "Backend")', params);
            },
            onEventResize: (args)=>  {
                var params = {
                    id: args.e.id(),
                    newStart: args.newStart.toString(),
                    newEnd: args.newEnd.toString()
                };

                //  $http.post('@Url.Action("Move", "Backend")', params);
            },
            onEventClicked: (args)=>  {
                var modal = new DayPilot.Modal( {
                    onClosed: (args) =>{
                        if (args.result) {  // args.result is empty when modal is closed without submitting
                            this.loadEvents();
                        }
                    }
                } );

                modal.showUrl( '@Url.Action("Edit", "Event")/' + args.e.id() );
            }
        };

        this.navigatorConfig = {
            selectMode: "day",
            showMonths: 3,
            skipMonths: 3,
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.dayConfig.startDate = args.day;
                this.loadEvents();
            }
        };
    }

    saveOrder() {


    }
    showDay() {
        this.dayConfig.visible = true;
        this.weekConfig.visible = false;
        this.navigatorConfig.selectMode = "day";
    };

    showWeek() {
        this.dayConfig.visible = false;
        this.weekConfig.visible = true;
        this.navigatorConfig.selectMode = "week";
    };

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

    addEvent() {
        this.events.push(
            {
                start: new DayPilot.Date( "2016-09-01T10:00:00" ),
                end: new DayPilot.Date( "2016-09-01T12:00:00" ),
                id: DayPilot.guid(),
                text: "Simple Event"
            }
        );
    };

    moveEvent() {
        var event = this.events[0];
        event.start = event.start.addDays( 1 );
        event.end = event.end.addDays( 1 );
    };

    renameEvent() {
        this.events[0].text = "New name";
    }
}

export let MasterScedulerComponentUrl = "";
export let MasterScedulerComponentName = 'pgMasterSceduler';
export let MasterScedulerComponentOptions = {
    template: template,
    controller: MasterScedulerComponentController
};