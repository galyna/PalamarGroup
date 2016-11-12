/**
 * Created by Galyna on 06.10.2016.
 */
import {MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import IMasterFavor = pg.models.IMasterFavor;
import {ISchedulerScope} from "./master.scheduler";
import {SchedulerServiceName, ISchedulerService} from "../../../ui/scheduler.service";

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

    static $inject = ["$log", '$timeout', "$mdDialog", MasterResourceName,
        "$routeParams", '$scope', SchedulerServiceName];

    masterId: any;
    master: string;
    events: IScheduler[];
    weekConfig: any;
    navigatorConfig: any;
    navigatorSmallConfig: any;
    tasks: ITask[];
    appointment: any;


    constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService, private $mdDialog: ng.material.IDialogService,
                private MasterResource: IMasterResource,
                private $routeParams: ng.route.IRouteParamsService, private $scope: ISchedulerScope,
                private SchedulerService: ISchedulerService) {
        this.events = [];
        this.tasks = [];
    }

    $onChanges(changesObj) {
        console.log(changesObj);
        if (changesObj.master.currentValue && changesObj.master.previousValue != changesObj.master.currentValue) {
            this.masterId = changesObj.master.currentValue;
            this.init();
        }
    };

    init() {

        this.initWeekConfig();
        this.initNavigatorConfig();
        this.initNavigatorSmallConfig();
        this.loadEvents(new Date());
    }

    loadEvents(start) {
        if (this.masterId) {
            var days = this.SchedulerService.getStartAndEndOfWeek(start);
            var params = {
                id: this.masterId,
                start: days[0].toISOString(),
                end: days[1].toISOString(),
            }
            this.MasterResource.getTasks(params).$promise.then((tasks) => {
                this.tasks = tasks;
                this.events = this.tasks.map((task)=> {
                    return angular.copy(task.scheduler);
                });

            }).catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
        }
    }

    initWeekConfig() {
        this.weekConfig = this.SchedulerService.getWeekConfig();

        this.weekConfig.onTimeRangeSelect= (args)=> {
                var params = {
                    appointment: angular.copy(this.appointment),
                    scheduler: {
                        start: args.start.toString(),
                        end: args.end.toString(),
                        id: DayPilot.guid()
                    }
                };
                if (!params.appointment.isConsultation) {
                    params.appointment.favors = this.getFavors();
                }
            this.SchedulerService.updateTaskText(params);
                this.MasterResource.addTask({id: this.masterId}, params).$promise.then((task) => {
                    this.tasks.push(task);
                    this.events.push(task.scheduler);
                    this.$scope.week.update();
                });

            };

        this.weekConfig.onEventResize= (args)=> {
                var event = {
                    id: args.e.id(),
                    start: args.newStart.toString(),
                    end: args.newEnd.toString(),
                    text: args.e.text(),
                    borderColor: args.e.borderColor,
                    barColor: args.e.barColor,
                };
                var originalTask;

                var tasks = this.tasks.filter((task)=> {
                    return task != null && task.scheduler.id === event.id;
                });
                if (tasks.length > 0 && event) {
                    var task = tasks[0];
                    originalTask = angular.copy(task);
                    task.scheduler = event;
                    this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
                        this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
                    }) .catch((err)=> {
                        this.revertResize(originalTask);
                        this.$scope.week.update();
                        this.$log.error(err);
                        this.showErrorDialog();
                    });
                }
            };


    }

    initNavigatorSmallConfig() {
        this.navigatorSmallConfig = this.SchedulerService.getNavigatorSmallConfig();
        this.navigatorSmallConfig.onTimeRangeSelected= (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents(args.day);
            };
    }

    initNavigatorConfig() {
        this.navigatorConfig = this.SchedulerService.getNavigatorConfig();
        this.navigatorConfig.onTimeRangeSelected = (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents(args.day)
        };
    }

    getFavors() {
        return this.appointment.favors.map((mf)=> {
            return {
                name: mf.favor.name,
                id: mf._id,
                price: mf.price,
                photo: mf.favor.photo.url
            }
        });

    }

    updateMaster(task: ITask) {
        this.SchedulerService.updateTaskText(task);

        this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
            this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
            var tempEvents = this.events.filter((e)=> {
                return e.id == newTask.scheduler.id;
            })

            if (tempEvents.length > 0 && event) {

                this.events.splice(this.events.indexOf(tempEvents[0]), 1, newTask.scheduler);
            }
        }).catch((err)=> {
            this.$log.error(err);
            this.showErrorDialog();
        });


    }

    updateMasterOnResize(event) {
        var originalTask;
        var tasks = this.tasks.filter((task)=> {
            return task != null && task.scheduler.id === event.id;
        });
        if (tasks.length > 0 && event) {
            var task = tasks[0];
            originalTask = task;
            task.scheduler = event;
            this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
                this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
            }) .catch((err)=> {
                this.revertResize(originalTask);
                this.$log.error(err);
                this.showErrorDialog();
            });
        }
    }

    revertResize(originalTask) {

        var events = this.events.filter((e)=> {
            return e.id == originalTask.scheduler.id;
        })
        if (events.length > 0) {
            this.events.splice(this.events.indexOf(events[0]), 1, originalTask.scheduler);

        }

    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }

}

export let AppointmentSchedulerComponentName = 'pgAppointmentScheduler';
export let AppointmentSchedulerComponentOptions: ng.IComponentOptions = {
    controller: AppointmentSchedulerComponentController,
    template: template,
    bindings: {
        "appointment": '<',
        'master': '<'
    }
};
