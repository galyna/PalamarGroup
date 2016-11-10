import {MasterResourceName, IMasterResource, IMaster, IScheduler} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import ITask = pg.models.ITask;
import IMasterFavor = pg.models.IMasterFavor;
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";

const template = `<div class=" description-container">
    <div class=" courses" layout-align="center center" layout="column"
    >
        <div hide show-gt-xs="true" layout="row" layout-align="center center">

            <md-card flex-gt-md="70" flex-md="80" flex-gt-xs="85" md-whiteframe="5"
            >
                <md-card-content flex layout="row" layout-align="start none">
                    <div class="card-media "
                         flex="50"><img src="{{::$ctrl.master.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc  "
                         flex="50" layout="column" layout-align="space-around center">
                        <div ng-if="$ctrl.master.rate && $ctrl.master.rate._id!=='0'" hide show-md="true"
                             class="corner-ribbon top-right white"
                        >
                            {{::$ctrl.master.rate.text}}
                        </div>
                        <div ng-if="$ctrl.master.rate && $ctrl.master.rate._id!=='0'" hide-md="true"
                             class="corner-ribbon-min top-right white"
                        >
                            {{::$ctrl.master.rate.text}}
                        </div>
                        <div layout="row" layout-align="center center" class="md-padding md-margin ">
                            <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::$ctrl.master.name}}</div>
                            <div hide show-sm="true" flex="90" class="md-display-1">{{::$ctrl.master.name}}
                            </div>
                        </div>
                        <div hide show-gt-sm="true" class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div flex="40"  hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in $ctrl.master.services.slice(0,18) track by $index"
                                 layout-align=" start center">
                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">

                                </div>
                                <div class="  md-headline date-text capitalize">
                                    {{ ::service.favor.name}}
                                </div>
                            </div>
                        </div>

                        <div flex="20" hide show-sm="true"
                             layout="row" layout-align="center center">
                            <md-button class=" md-margin near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       ng-click="::$ctrl.showAppointmentDialog($ctrl.master)">
                                Записатись
                            </md-button>
                        </div>
                    </div>

                </md-card-content>
            </md-card>
        </div>
        <div hide-gt-xs="true" layout="row" layout-align="center center">

            <md-card md-whiteframe="8">
                <md-card-content layout="column">
                    <div ng-if="$ctrl.master.rate && $ctrl.master.rate._id!=='0'" class="card-desc-top-master white"
                         flex
                         layout="column"
                         layout-align=" space-around center">
                        <md-card-title>
                            <md-card-title-text flex layout="column" layout-align=" space-around center">
                                <div class="md-headline"> {{::$ctrl.master.rate.text}}</div>
                            </md-card-title-text>
                        </md-card-title>
                    </div>
                    <div class="card-media ">
                        <img
                                src="{{::$ctrl.master.photo.url}}"
                                class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="center center">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline">{{::$ctrl.master.name}}</div>

                            </md-card-title-text>
                        </md-card-title>
                        <div class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in $ctrl.master.services track by $index"
                                 layout-align=" start center">
                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">

                                </div>

                            </div>
                        </div>
                        <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                   ng-click="::$ctrl.showAppointmentDialog(product)">
                            Записатись
                        </md-button>
                    </div>
                </md-card-content>

            </md-card>

        </div>
    </div>
    <div flex layout-align="center center" layout="row">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap">
                <div class=" header" layout="column" layout-align="center center">
                    <div class="md-display-1"> ГРАФІК РОБОТИ</div>
                    <div class="md-title md-padding"> ВИБЕРИ ЧАС ТА ЗАПИШИСЬ</div>
                </div>
                <div class="master-scheduler" layout="row" flex layout-align="center center">
                    <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
                        <div layout="row" layout-xs="column" class='master-calendar'>
                            <div hide show-gt-xs="true" class="md-padding " layout="row" layout-align="center center">
                                <daypilot-navigator style=" width: 280px" id="navi-front" ng-if='$ctrl.navigatorConfig'
                                                    daypilot-config="$ctrl.navigatorConfig"></daypilot-navigator>

                            </div>
                            <div hide-gt-xs="true" class="md-padding " layout="row" layout-align="center center">

                                <daypilot-navigator style=" width: 280px" id="navis" ng-if='$ctrl.navigatorSmallConfig'
                                                    daypilot-config="$ctrl.navigatorSmallConfig"></daypilot-navigator>
                            </div>
                            <div flex class="md-padding " ng-if='$ctrl.weekConfig'>
                                <daypilot-calendar id="week-front" daypilot-config="$ctrl.weekConfig"
                                                   daypilot-events="$ctrl.events"></daypilot-calendar>
                            </div>

                        </div>
                    </div>

                </div>
                
                 <div layout="row" layout-align="center center">
                    <div   hide-xs="true" flex="60" flex-gt-sm="50"
                         class="md-display-1 md-margin md-padding">
                        {{::$ctrl.master.description}}
                    </div>
                    <div    hide-gt-xs="true"  flex="70"
                         class="md-headline ">{{::$ctrl.master.description}}
                    </div>

                </div>
            </div>
            <div class="overlay-comments">
            </div>

        </div>
    </div>
    <div flex layout-align="center center" layout="row"
         ng-if="$ctrl.master.videos.length>0 || $ctrl.master.works.length>0">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  invers header">
                <div class="md-display-2"> РОБОТИ МАЙСТРА</div>
            </div>

        </div>
    </div>
    
     <div class="courses-details" layout="row" flex layout-align="center center">
        <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos"
                         ng-repeat="video in $ctrl.master.videos track by $index"
                         flex>
                    <div flex class="embed-responsive embed-responsive-16by9">
                        <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                       video-id="::video.url"></youtube-video>
                    </div>
                    <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::video.name}}</span>
                    </md-card-content>
                </md-card>
            </div>
        </div>

    </div>

    <div flex="100" class="courses-details" layout="row" layout-align="center center"
    >
        <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" ng-repeat="photo in $ctrl.master.works track by $index"
                         class="md-margin "
                         ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.master.works.length)}}"
                         flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMediaObserver($ctrl.master.works, $index)">
                    <img ng-src="{{::photo.url}}" class="md-card-image">
                    <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::photo.name}}</span>
                    </md-card-content>
            </div>
        </div>
    </div>



   

</div>


`;
const appointmentTemplate = `<md-dialog class="pop-form-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2  hide show-gt-sm='true' class=" md-padding ">Записатись на прйом до майстра {{::vm.appointment.master.name}}</h2>
            <h2 hide-gt-sm='true' class=" md-padding ">Записатись  до {{::vm.appointment.master.name}}</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="::vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex ng-submit="::vm.save(orderForm)">
        <md-dialog-content>
            <md-dialog-content-body>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                    <label for="name">Як до вас звертатись?</label>
                    <input id="name" ng-model="vm.appointment.name" type="text" name="name" required>
                     <div ng-messages="orderForm.name.$error" role="alert"
                         ng-show="orderForm.$submitted && orderForm.name.$invalid" >
                        <div class="md-headline" ng-message="required">
                             Залиште хоч якусь інформацію про себе, бажано номер телефону
                        </div>
                    </div>
                </md-input-container>
                <md-input-container class="md-block reduce-bottom-margin">
                    <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                    <label for="phone">Телефон</label>
                    <input id="phone" ng-model="vm.appointment.phone" type="text" name="phone">
                </md-input-container>
                <div flex="100" layout="row" layout-xs="columm">
                    <div flex="50" flex-xs="100" class="order-picker-container " layout="row">
                        <md-datepicker md-open-on-focus class="order-date-picker" placeholder="Дата" flex ng-model="vm.appointment.date"
                                       name="dateField"></md-datepicker>
                    </div>
                    <md-input-container flex="50" flex-xs="100">
                        <md-icon md-svg-icon="action:ic_schedule_24px"></md-icon>
                   
                        <md-select ng-model="vm.dayHour" ng-model-options="{trackBy: '$value.id'}">
                            <md-option ng-repeat="hour in vm.dayHours" ng-value="hour">
                                {{ hour.value }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
                <md-input-container class="md-block ">
                    <label for="service">Послуга</label>
                    <md-select ng-model="vm.appointment.service"
                               ng-model-options="{trackBy: '$value._id'}">
                        <md-option ng-repeat="service in vm.appointment.master.services" ng-value="service">
                            <div layout="row" layout-align=" start center  ">
                                <img ng-src="{{service.favor.photo.url}}" class="avatar" alt="{{service.favor.name}}"/>
                                <span>  {{ service.favor.name }}  </span></div>
                        </md-option>
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                    <label for="comment">Додаткова інформація</label>
                    <textarea id="comment" ng-model="vm.appointment.comment" name="comment"></textarea>
                </md-input-container>
                <p class=" md-headline">Після запису з Вами звяжеться адміністратор для підтвердження</p>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            <md-button type="submit" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`
class AppointmentDialogController {

    static $inject = ['$mdDialog', 'appointment'];
    private appointment: IAppointment;
    private originalAppointment: IAppointment;

    dayHour: any;
    dayHours = [{id: 1, value: '10:00'}, {id: 2, value: '10:30'}, {id: 3, value: '11:00'}, {id: 4, value: '11:30'},
        {id: 5, value: '12:00'}, {id: 6, value: '12:30'}, {id: 7, value: '13:00'}, {id: 8, value: '13:30'}, {
            id: 9,
            value: '14:00'
        },
        {id: 10, value: '14:30'}, {id: 11, value: '15:00'}, {id: 12, value: '15:30'}, {id: 13, value: '16:00'}, {
            id: 14,
            value: '16:30'
        },
        {id: 15, value: '17:00'}, {id: 16, value: '17:30'}, {id: 17, value: '18:00'}, {id: 18, value: '18:30'}];

    constructor(private $mdDialog: ng.material.IDialogService, appointment: IAppointment) {
        this.appointment = angular.copy(appointment);
        this.originalAppointment = appointment;
        this.setTime();
    }

    setTime() {
        if (this.appointment.date) {
            var minutes = this.appointment.date.getUTCMinutes();
            var hourValue = this.appointment.date.getUTCHours() + ':' + (  (minutes < 10) ? minutes + '0' : minutes);
            this.dayHours.forEach((hour)=> {
                if (hour.value === hourValue) {
                    this.dayHour = hour
                }
            })
        }
    }

    save(orderForm) {
        if (this.appointment.name || this.appointment.comment || this.appointment.phone) {
            if (this.dayHour && this.appointment.date) {
                var time = this.dayHour.value.split(':');
                this.appointment.date.setHours(time[0]);
                this.appointment.date.setMinutes(time[1]);
                this.dayHour = null;
            }

            angular.extend(this.originalAppointment, this.appointment);
            this.$mdDialog.hide(this.originalAppointment);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class MasterComponentController {

    static $inject = ["$log", "$routeParams", MasterResourceName, '$mdDialog', '$rootScope', AppointmentResourceName,
        MediaObserverFactoryName, 'constants', "orderByFilter"];
    master: IMaster;
    private appointment: IAppointment;
    events: IScheduler[];
    weekConfig: any;
    navigatorConfig: any;
    navigatorSmallConfig: any;
    socialParams: any;

    constructor(private $log: ng.ILogService, private $routeParams: ng.route.IRouteParamsService,
                private MasterResource: IMasterResource, private mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private AppointmentResource: IAppointmentResource,
                private mediaObserver: IMediaObserverFactory,
                private constants: IConstants, private orderByFilter: ng.IFilterOrderBy) {
        this.events = [];
        this.appointment = new this.AppointmentResource();

    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.MasterResource.get({id: this.$routeParams["id"], populate: 'services.favor'}).$promise
                .then((master) => {
                    this.master = master;
                    this.master.videos = this.orderByFilter(this.master.videos, "order");
                    this.master.works = this.orderByFilter(this.master.works, "order");
                }).catch((err)=> {
                this.$log.error(err);

            });
            this.loadEvents(new Date(), this.$routeParams["id"]);
        }
    }


    getStartAndEndOfWeek(date): Date[] {
        date = new Date(date);
        date.setUTCHours(0);
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        var start = new Date(date.setDate(diff));
        var end = new Date(date.setDate(start.getDate() + 7));
        return [start, end];
    }

    loadEvents(start, masterId) {

        var days = this.getStartAndEndOfWeek(start);
        var params = {
            id: masterId,
            start: days[0].toISOString(),
            end: days[1].toISOString(),
        }
        this.MasterResource.getTasks(params).$promise.then((tasks) => {
            this.initWeekConfig();
            this.initNavigatorConfig();
            this.initNavigatorSmallConfig();
            this.iniOnTimeRangeSelect();
            this.events = tasks.map((task)=> {
                this.updateTaskText(task);
                return angular.copy(task.scheduler);
            });

        }).catch((err)=> {
            this.$log.error(err);

        });
    }


    updateTaskText(task: ITask) {

        task.scheduler.borderColor = "gray";
        task.scheduler.barColor = "gray";
        task.scheduler.text = `<div><span>Запис</span></div>`;


    }

    initNavigatorSmallConfig() {
        this.navigatorSmallConfig = {
            selectMode: "week",
            showMonths: 1,
            skipMonths: 1,
            locale: "uk-ua",
            cellHeight: "40",
            cellWidth: "40",
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents(args.day, this.master._id);
            }
        };
    }

    initNavigatorConfig() {
        this.navigatorConfig = {
            selectMode: "week",
            showMonths: 3,
            skipMonths: 3,
            locale: "uk-ua",
            cellHeight: "34.5",
            cellWidth: "30",
            onTimeRangeSelected: (args)=> {
                this.weekConfig.startDate = args.day;
                this.loadEvents(args.day, this.master._id);
            }
        };
    }

    initWeekConfig() {
        this.weekConfig = {
            visible: true,
            viewType: "Week",
            angularAutoApply: true,
            locale: "uk-ua",
            businessBeginsHour: "10",
            businessEndsHour: "19",
            headerDateFormat: 'dd.MM',
            cellHeight: "40",
            durationBarVisible: "false",
            columnMarginRight: "0",
            hideUntilInit: true,
            eventMoveHandling: 'Disabled',
            eventResizeHandling: 'Disabled',
            heightSpec: 'BusinessHours'

        };


    }

    iniOnTimeRangeSelect() {

        this.weekConfig.eventResizeHandling = 'Update';
        this.weekConfig.onTimeRangeSelected = (args)=> {

            this.appointment.date = new Date(args.start.toString()),
                this.showAppointmentDialog()
        };
    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/#master" + this.master._id;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = "Робота майстра " + this.master.name;
        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }

    showMediaObserver(items, index): void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }

    showAppointmentDialog(service=null) {
        this.appointment.master = this.master;
        this.appointment.service =service;
        this.mdDialog.show({
            template: appointmentTemplate,
            clickOutsideToClose: true,
            bindToController: true,
            controller: AppointmentDialogController,
            controllerAs: 'vm',
            parent: angular.element(document.body),

            locals: {
                appointment: this.appointment,
            },
        }).then((result) => {
            this.handleDialogResult(result);
        });
        ;
    }

    handleDialogResult(result) {
        this.$rootScope.loading = true;
        this.appointment.master = this.master;
        if (this.appointment.service) {
            this.appointment.favors = [];
            this.appointment.favors.push(this.appointment.service);
        }
        this.appointment.creationDate = new Date().toJSON();
        this.appointment.date = new Date(this.appointment.date).toJSON();
        this.appointment.$save()
            .then(() => {
                this.mdDialog.hide();
                this.showOrderConfirm();
            })
            .catch((err) => {
                this.$log.error(err);
            })
            .finally(() => {
                this.appointment = new this.AppointmentResource();
                this.$rootScope.loading = false;
            });

    }

    showOrderConfirm(): void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу запис прийнято. ')
                .textContent('З вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }

}

export let MasterComponentUrl = "/master/:id";
export let MasterComponentName = 'pgMaster';
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};
