const template = `<div style="float:left; width: 170px">
        <daypilot-navigator id="navi" daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>
    </div>
    <div style="margin-left: 170px">

        <daypilot-calendar id="day" daypilot-config="$ctrl.dayConfig" daypilot-events="$ctrl.events"></daypilot-calendar>

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

export class MasterScedulerComponentController {

    static $inject = ['$timeout'];


    events :any[];
    
    constructor(private $timeout:ng.ITimeoutService) {
        this.events=[];
        this.events.push(
            {
                start: new DayPilot.Date( "2016-09-27T10:00:00" ),
                end: new DayPilot.Date( "2016-09-27T12:00:00" ),
                id: DayPilot.guid(),
                text: "Simple Event"
            }
        );
    }
    
    navigatorConfig = {
        selectMode: "day",
        showMonths: 3,
        skipMonths: 3,
        onTimeRangeSelected: function (args) {

            this.dayConfig.startDate = new DayPilot.Date( "2016-09-01T10:00:00" );
            this.loadEvents();
        }
    };


    dayConfig = {
        viewType: "Day",
        onTimeRangeSelected: function (args) {
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
                id: 1//data.id
            } );
            // });
        },
        onEventMove: function (args) {
            var params = {
                id: args.e.id(),
                newStart: args.newStart.toString(),
                newEnd: args.newEnd.toString()
            };

            // $http.post('@Url.Action("Move", "Backend")', params);
        },
        onEventResize: function (args) {
            var params = {
                id: args.e.id(),
                newStart: args.newStart.toString(),
                newEnd: args.newEnd.toString()
            };

            //  $http.post('@Url.Action("Move", "Backend")', params);
        },

        onEventClick: function (args) {
            var modal = new DayPilot.Modal( {
                onClosed: function (args) {
                    if (args.result) {  // args.result is empty when modal is closed without submitting
                        this.loadEvents();
                    }
                }
            } );

            modal.showUrl( '@Url.Action("Edit", "Event")/' + args.e.id() );
        }
    };


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

            this.events.push(
                {
                    start: new DayPilot.Date( "2016-09-27T12:00:00" ),
                    end: new DayPilot.Date( "2016-09-27T16:00:00" ),
                    id: DayPilot.guid(),
                    text: "Simple Event"
                }
            );
        } );
    }

    addEvent() {
        this.events.push(
            {
                start: new DayPilot.Date( "2014-09-01T10:00:00" ),
                end: new DayPilot.Date( "2014-09-01T12:00:00" ),
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