import {MasterResourceName, IMasterResource, IMaster, IScheduler} from "../../resources/master.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
;
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import ITask = pg.models.ITask;
import IMasterFavor = pg.models.IMasterFavor;
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";
import {IRootScope} from "../../../typings";
import {SchedulerServiceName, ISchedulerService} from "../../ui/scheduler.service";

const template = `<div class=" description-container">
    <div class=" courses" layout-align="center center" layout="column"
    >
        <div hide hide-xs="true" show-gt-xs="true" layout="row" layout-align="center center">

            <md-card flex-gt-md="70" flex-md="80" flex-gt-xs="85" md-whiteframe="5"
            >
                <md-card-content flex layout="row" layout-align="start none">
                    <div class="card-media "
                         flex="50"><img ng-src="{{::$ctrl.master.photo.url}}" class="md-card-image "/>
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
        <div show-xs="true" hide layout="row" layout-align="center center">

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
            <div class="overlay-description">
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

export class MasterComponentController {

    static $inject = ["$log", "$routeParams", MasterResourceName,
        AppointmentServiceName, AppointmentResourceName,
        MediaObserverFactoryName, 'constants', "orderByFilter",
        '$mdDialog', '$rootScope', SchedulerServiceName,'$location'];

    master: IMaster;
    events: IScheduler[];
    weekConfig: any;
    navigatorConfig: any;
    navigatorSmallConfig: any;
    socialParams: any;

    constructor(private $log: ng.ILogService, private $routeParams: ng.route.IRouteParamsService,
                private MasterResource: IMasterResource, private AppointmentService: IAppointmentService,
                private AppointmentResource: IAppointmentResource,
                private mediaObserver: IMediaObserverFactory,
                private constants: IConstants, private orderByFilter: ng.IFilterOrderBy,
                private $mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private SchedulerService: ISchedulerService, private $location: ng.ILocationService) {
    }

    $onInit() {
        this.events = [];
        if (this.$routeParams["id"]) {
            this.MasterResource.get({id: this.$routeParams["id"], populate: 'services.favor'}).$promise
                .then((master) => {
                    this.master = master;
                    this.master.videos = this.orderByFilter(this.master.videos, "order");
                    this.master.works = this.orderByFilter(this.master.works, "order");
                }).catch((err)=> {
                this.$log.error(err);
                this.$location.path(`/beauty-parlour/masters`);
            });
            this.loadEvents(new Date(), this.$routeParams["id"]);
        }
    }


    loadEvents(start, masterId) {

        var days = this.SchedulerService.getStartAndEndOfWeek(start);
        var params = {
            id: masterId,
            start: days[0].toISOString(),
            end: days[1].toISOString(),
        }
        this.MasterResource.getTasks(params).$promise.then((tasks) => {
            this.initTasks(tasks);
        }).catch((err)=> {
            this.$log.error(err);

        });
    }

    initTasks(tasks) {
        this.weekConfig = this.SchedulerService.getWeekConfig();
        this.initNavigatorConfig();
        this.initNavigatorSmallConfig();
        this.iniOnTimeRangeSelect();
        tasks = tasks.filter((task)=> {
            return task.appointment.isPreOrder == false;
        })
        this.events = tasks.map((task)=> {
            task.scheduler.borderColor = "gray";
            task.scheduler.barColor = "gray";
            task.scheduler.text = `<div><span>Запис</span></div>`;
            return angular.copy(task.scheduler);
        });
    }

    initNavigatorSmallConfig() {
        this.navigatorSmallConfig = this.SchedulerService.getNavigatorSmallConfig();
        this.navigatorSmallConfig.onTimeRangeSelected = (args)=> {
            this.weekConfig.startDate = args.day;
            this.loadEvents(args.day, this.master._id);
        };
    }

    initNavigatorConfig() {
        this.navigatorConfig = this.SchedulerService.getNavigatorConfig();
        this.navigatorConfig.onTimeRangeSelected = (args)=> {
            this.weekConfig.startDate = args.day;
            this.loadEvents(args.day, this.master._id);
        };
    }

    iniOnTimeRangeSelect() {
        this.weekConfig.onTimeRangeSelected = (args)=> {
            var date = new Date(args.start.toString());

            if (date > new Date()) {
                var appointment = new this.AppointmentResource();
                appointment.master = this.master;
                appointment.date = date;
                this.AppointmentService.onShowDialog(appointment);

            } else {
                this.showPassedDateConfirm();
            }
        };
    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/beauty-parlour/master/" + this.master._id;
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

    showAppointmentDialog(service = null) {
        var appointment = new this.AppointmentResource();
        appointment.master = this.master;
        appointment.service = service;
        this.AppointmentService.onShowDialog(appointment);
    }

    showPassedDateConfirm(): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Ви вибрали час у минулому ')
                .textContent(' Виберіть будь ласка час у майбутньому. Дякуємо.')
                .ariaLabel('Виберіть будь ласка час у майбутньому. ')
                .ok('Закрити')
        );

    }

}

export let MasterComponentUrl = "/beauty-parlour/master/:id";
export let MasterComponentName = 'pgMaster';
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};
