import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {ItServiceName, ItService} from "../../../users/services/it.service";
import IMasterFavor = pg.models.IMasterFavor;
import {SchedulerServiceName, ISchedulerService} from "../../../ui/scheduler.service";


const template = `

 <div layout="row" class="master-scheduler" layout-xs="column">
                <div hide show-gt-xs="true" class="md-padding " layout="row" layout-align="start start">
                    <daypilot-navigator  style=" width: 270px;top:0;" id="navi"
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
              <md-button   ng-click="$ctrl.sum()"
                       class="md-raised">Сума за тиждень
            </md-button>
             <span class="md-margin">{{$ctrl.weekSum}} грн.</span>

            </div>`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>

    <md-toolbar>
        <div class="md-toolbar-tools">
            <img ng-src="{{$ctrl.masterPhoto}}" class="avatar" alt="{{$ctrl.masterPhoto}}"/>
            <h2>Деталі замовлення</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>

    </md-toolbar>
    <md-dialog-content>
        <div class="md-dialog-content" layout="column">
            <div layout-gt-sm="row" layout="column">
                <div flex="100" flex-gt-sm="30" layout="column" class="md-margin" ng-if="!$ctrl.appointment.isDayOff">
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
                        <label>Коментар замовника</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                               ng-model="$ctrl.appointment.comment"/>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <md-checkbox ng-disabled="::!$root.it.can('modifySalon')"
                                     ng-model="$ctrl.appointment.isConsultation">Записатись на консультацію
                        </md-checkbox>
                    </md-input-container>
                </div>
                <div flex="100" flex-gt-sm="30" layout="column"
                     ng-if="!$ctrl.appointment.isDayOff && !$ctrl.appointment.isConsultation "
                     class="md-margin md-whiteframe-z8">
                    <md-subheader ng-if="$ctrl.appointment.favors.length>0" class="md-no-sticky">Послуги</md-subheader>
                    <md-input-container ng-if="$ctrl.appointment.favors.length>0" class="md-block">

                        <div ng-repeat="favor in $ctrl.appointment.favors">
                            <div layout="row" flex>
                                <img ng-src="{{favor.photo}}" class="avatar" alt="{{favor.photo}}"/>
                                <div flex layout="column" layout="center">

                                    <div id="prokgram" name="program">
                                        {{favor.name}}
                                    </div>
                                    <div id="program" name="program">
                                        {{favor.price}} грн.
                                    </div>
                                </div>

                                <md-button ng-if="::$root.it.can('modifySalon')"
                                           class="md-icon-button"
                                           ng-click="$ctrl.deleteService(favor)">
                                    <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                </md-button>
                            </div>
                        </div>
                    </md-input-container>
                    <md-subheader ng-if="$ctrl.showAddFavors && $root.it.can('modifySalon')" class="md-no-sticky">Додати
                        послугу
                    </md-subheader>
                    <md-select ng-if="$ctrl.showAddFavors && $root.it.can('modifySalon') " ng-model="$ctrl.newService"
                               ng-model-options="{trackBy: '$value._id'}">
                        <md-option ng-repeat="services in $ctrl.services" ng-value="services">
                            <div layout="row" layout-align=" start center  ">
                                <img ng-src="{{services.favor.photo.url}}" class="avatar"
                                     alt="{{services.favor.name}}"/>
                                <span>  {{ services.favor.name }}  </span></div>
                        </md-option>
                    </md-select>
                    <md-input-container ng-if="$ctrl.showAddFavors && $root.it.can('modifySalon')" layout="row"
                                        class="md-block">
                        <label for="newProgram">ЦІНА</label>
                        <input type="number" ng-model="$ctrl.newService.price"/>

                    </md-input-container>
                    <md-button ng-if="$ctrl.showAddFavors && $root.it.can('modifySalon')"
                               ng-disabled="!$ctrl.newService " class="md-raised " ng-click="$ctrl.addService()">
                        Додати послугу
                    </md-button>

                </div>
                <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">
                    <md-subheader class=" md-margin  md-no-sticky">Адміністративна частина
                    </md-subheader>
                    <md-input-container class="md-block">
                        <label>Коментар адміністратора</label>
                        <textarea class=" md-padding  " ng-disabled="::!$root.it.can('modifySalon')"
                                  ng-model="$ctrl.appointment.admin_comment"></textarea>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <md-checkbox ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.isDayOff">
                            Час без замовлень
                        </md-checkbox>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <md-checkbox ng-disabled="::!$root.it.can('modifySalon')"
                                     ng-model="$ctrl.appointment.isPreOrder">Попереднє замовлення
                        </md-checkbox>
                    </md-input-container>
                </div>
            </div>
            <div class=" md-padding " ng-if="::$root.it.can('modifySalon')" layout-gt-sm="row" layout="column">

                <span flex></span>

                <md-button class=" md-primary md-accent" ng-click="$ctrl.delete()" aria-label="cancel">
                    Видалити
                </md-button>
                <md-button class=" md-raised md-primary md-accent" ng-click="$ctrl.save()" aria-label="save">
                    Зберегти
                </md-button>

                <md-button class="md-raised  md-primary" ng-click="$ctrl.cancel()" aria-label="cancel">
                    Відмінити
                </md-button>
            </div>
        </div>
    </md-dialog-content>


</md-dialog>
`;

export interface ISchedulerScope extends ng.IScope {
    week: any;
}
class EditDialogController {


    static $inject = ['$mdDialog', "$mdToast", 'task'];
    private services: any[];
    private masters: IMaster[];
    private masterPhoto: string;
    private newService: IMasterFavor;
    private appointment: any;
    private originalAppointment: any;
    private showAddFavors;


    constructor(private $mdDialog: ng.material.IDialogService, private $mdToast: ng.material.IToastService, private task) {
        this.appointment = angular.copy(task.appointment);
        this.originalAppointment = this.appointment;
        this.setServices();
    }

    deleteService(favor) {
        this.appointment.favors.splice(this.appointment.favors.indexOf(favor), 1)
    }

    addService() {
        if (!this.appointment.favors.some((f) => {
                return this.newService._id === f.id;
            })) {
            this.appointment.favors.push({
                name: this.newService.favor.name,
                photo: this.newService.favor.photo.url,
                id: this.newService._id,
                price: this.newService.price,

            });
            this.newService = null;
        } else {
            this.$mdToast.showSimple(`Така послуга вже існує`);
        }

    }

    setServices() {
        this.showAddFavors = false;
        this.masters.forEach((m) => {
            if (m._id === this.appointment.master) {
                this.services = m.services;
                this.masterPhoto = m.photo.url;
                this.showAddFavors = true;
                return;
            }
        })
    }

    save() {

        angular.extend(this.originalAppointment, this.appointment);
        this.task.appointment = this.originalAppointment;
        this.$mdDialog.hide({action: "save", task: this.task});

    }

    delete() {
        this.$mdDialog.hide({action: "delete", task: this.task});

    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterSchedulerComponentController {

    static $inject = ["$log", '$timeout', "$mdDialog", "$scope",
        MasterResourceName, "$routeParams", ItServiceName, SchedulerServiceName,
        '$mdMedia'];

    masterId: string;
    masters: IMaster[];
    events: IScheduler[];
    weekConfig: any;
    navigatorConfig: any;
    navigatorSmallConfig: any;
    tasks: ITask[];
    photo: string;
    mode: string;
    weekSum: any;


    constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService, private $mdDialog: ng.material.IDialogService,
                private $scope: ISchedulerScope, private MasterResource: IMasterResource, private $routeParams: ng.route.IRouteParamsService,
                private ItService: ItService, private SchedulerService: ISchedulerService,private $mdMedia) {
        this.events = [];
        this.tasks = [];

        this.masters = this.MasterResource.query({populate: 'services.favor'});
        if (this.$routeParams["id"]) {
            this.masterId = this.$routeParams["id"]
        }
        this.init();
    }

    init() {
        this.initWeekConfig();
        this.initNavigatorConfig();
        this.initNavigatorSmallConfig();
        this.loadEvents(new Date());
    }

    sum() {
        var tmpSums = this.tasks.map((task) => {
            var a = task.appointment.favors.map((fav) => {
                return fav.price
            })
            var sum = a.reduce(function (a, b) {
                return a + b;
            }, 0);

            return sum;
        });
        this.weekSum = tmpSums.reduce(function (a, b) {
            return a + b;
        }, 0);
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
                this.events = this.tasks.map((task) => {
                    return angular.copy(task.scheduler);
                });
                this.sum();

            }).catch((err) => {
                this.$log.error(err);
                this.showErrorDialog();
            });
        }
    }

    initWeekConfig() {
        this.weekConfig = this.SchedulerService.getWeekConfig();
        this.weekConfig.onEventClick = (args) => {
            var tasks = this.tasks.filter((task) => {
                return task != null && task.scheduler.id === args.e.id();
            });
            if (tasks.length > 0) {
                this.createEditDialod(tasks[0]);
            }
        };

        if (this.ItService.can('modifySalon')) {
            this.weekConfig.eventResizeHandling = 'Update';
            this.iniOnTimeRangeSelect();
            this.iniOnEventResize();
        }
    }

    initNavigatorSmallConfig() {
        this.navigatorSmallConfig = this.SchedulerService.getNavigatorSmallConfig()
        this.navigatorSmallConfig.onTimeRangeSelected = (args) => {
            this.weekConfig.startDate = args.day;
            this.loadEvents(args.day);
        };
    }

    initNavigatorConfig() {
        this.navigatorConfig = this.SchedulerService.getNavigatorConfig()
        this.navigatorConfig.onTimeRangeSelected = (args) => {
            this.weekConfig.startDate = args.day;
            this.loadEvents(args.day);
        };
    }

    iniOnEventResize() {
        this.weekConfig.onEventResize = (args) => {
            var event = {
                id: args.e.id(),
                start: args.newStart.toString(),
                end: args.newEnd.toString(),
                text: args.e.text(),
                borderColor: args.e.borderColor,
                barColor: args.e.barColor,
            };
            var originalTask;

            var tasks = this.tasks.filter((task) => {
                return task != null && task.scheduler.id === event.id;
            });
            if (tasks.length > 0 && event) {
                var task = tasks[0];
                originalTask = angular.copy(task);
                task.scheduler = event;
                this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
                    this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
                }) .catch((err) => {
                    this.revertResize(originalTask);
                    this.$scope.week.update();
                    this.$log.error(err);
                    this.showErrorDialog();
                });
            }
        }
    }

    iniOnTimeRangeSelect() {
        this.weekConfig.onTimeRangeSelect = (args) => {
            var params = {
                appointment: {
                    date: new Date(),
                    master: this.masterId
                },
                scheduler: {
                    start: args.start.toString(),
                    end: args.end.toString(),
                    text: "Новий запис, Заповніть форму",
                    borderColor: "red",
                    barColor: "red",
                    id: DayPilot.guid()
                }
            };
            this.MasterResource.addTask({id: this.masterId}, params).$promise.then((task) => {
                this.tasks.push(task);
                this.events.push(task.scheduler);
                this.$scope.week.update();
            });


        };
    }

    createEditDialod(task) {
        this.$mdDialog.show({
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            clickOutsideToClose: true,
            locals: {
                task: task,
                masters: this.masters
            },
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
            parent: angular.element(document.body),

        }).then((result) => {

            this.handleDialogResult(result);
        });
    }

    handleDialogResult(result) {
        switch (result.action) {
            case "delete":
                this.deleteMasterTask(result.task);
                break;
            case "save":
                this.updateMaster(result.task);

                break;
            default:
                throw "unknown action";
        }

    }

    updateMaster(task: ITask) {
        this.SchedulerService.updateTaskText(task);

        this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
            this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
            var tempEvents = this.events.filter((e) => {
                return e.id == newTask.scheduler.id;
            })

            if (tempEvents.length > 0 && event) {

                this.events.splice(this.events.indexOf(tempEvents[0]), 1, newTask.scheduler);
            }
        }).catch((err) => {
            this.$log.error(err);
            this.showErrorDialog();
        });


    }

    updateMasterOnResize(event) {
        var originalTask;
        var tasks = this.tasks.filter((task) => {
            return task != null && task.scheduler.id === event.id;
        });
        if (tasks.length > 0 && event) {
            var task = tasks[0];
            originalTask = task;
            task.scheduler = event;
            this.MasterResource.updateTask({id: this.masterId}, task).$promise.then((newTask) => {
                this.tasks.splice(this.tasks.indexOf(task), 1, newTask);
            }) .catch((err) => {
                this.revertResize(originalTask);
                this.$log.error(err);
                this.showErrorDialog();
            });
        }
    }

    revertResize(originalTask) {

        var events = this.events.filter((e) => {
            return e.id == originalTask.scheduler.id;
        })
        if (events.length > 0) {
            this.events.splice(this.events.indexOf(events[0]), 1, originalTask.scheduler);

        }

    }

    deleteMasterTask(deleteTask: ITask) {

        this.MasterResource.deleteTask({id: this.masterId, taskId: deleteTask._id}).$promise.then((master) => {
            this.tasks.splice(this.tasks.indexOf(deleteTask), 1);
            var events = this.events.filter((e) => {
                return e.id == deleteTask.scheduler.id;
            })
            if (events.length > 0 && event) {
                this.events.splice(this.events.indexOf(events[0]), 1);
            }
        }).catch((err) => {
            this.$log.error(err);
            this.showErrorDialog();

        });

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

export let MasterSchedulerComponentName = 'pgMasterScheduler';
export let MasterSchedulerComponentOptions: ng.IComponentOptions = {
    controller: MasterSchedulerComponentController,
    template: template

};