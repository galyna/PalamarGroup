import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";

const template = `<div class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div layout="row" flex>
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> Майстри</div>
                </div>

            </div>
        </div>

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>

            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
                             flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/>
                        </div>
                        <div class="card-desc "
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 class="corner-ribbon top-right white">
                                {{::master.rate.text}}
                            </div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 class="corner-ribbon-min top-right white">
                                {{::master.rate.text}}
                            </div>
                            <div layout="row" layout-align="center center" class="md-padding ">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                                <div hide show-sm="true"
                                ="true" flex="90" class="md-display-1">{{::master.name}}
                            </div>
                        </div>
                        <div hide show-gt-sm="true" class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in master.services.slice(0,12) track by $index"
                                 layout-align=" start center">

                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">
                                </div>
                                <div class="   md-title capitalize date-text">
                                    {{ ::service.favor.name}}
                                </div>
                            </div>
                        </div>

                        <md-button hide show-sm="true" class="  md-display-1 md-raised  " aria-label="Details"
                                   ng-click="::$ctrl.showMaster(master._id)">
                            Про майстра
                        </md-button>
                        <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  "
                                   aria-label="Details"
                                   ng-click="::$ctrl.showMaster(master._id)">
                            Про майстра
                        </md-button>

                        <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                                   aria-label="Details"
                                   ng-click="::$ctrl.showAppointmentDialog(master)">
                            Записатись
                        </md-button>

            </div>
            </md-card-content>
            </md-card>
            <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-desc  box"
                         flex="50" layout="column" layout-align="space-around center">
                        <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                             class="corner-ribbon top-left white"
                        >
                            {{::master.rate.text}}
                        </div>
                        <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                             class="corner-ribbon-min top-left white"
                        >
                            {{::master.rate.text}}
                        </div>
                        <div layout="row" layout-align="center center" class="md-padding md-margin">
                            <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                            <div hide show-sm="true"
                            ="true" flex="90" class="md-display-1">{{::master.name}}
                        </div>
                    </div>

                    <div hide show-gt-sm="true" class="md-title">
                        Вибери послугу та запишись
                    </div>
                    <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                        <div layout="column"
                             ng-repeat="service in master.services.slice(0,12) track by $index"
                             layout-align=" start center">

                            <div class="date-block md-margin "
                                 ng-click="::$ctrl.showAppointmentDialog(master,service)"
                                 ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                 layout="column"
                                 layout-align=" center center">
                            </div>
                            <div class="  md-title date-text capitalize">
                                {{ ::service.favor.name}}
                            </div>
                        </div>
                    </div>

                    <md-button hide show-sm="true" class="  md-display-1 md-raised  " aria-label="Details"
                               ng-click="::$ctrl.showMaster(master._id)">
                        Про майстра
                    </md-button>
                    <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  " aria-label="Details"
                               ng-click="::$ctrl.showMaster(master._id)">
                        Про майстра
                    </md-button>

                    <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                               aria-label="Details"
                               ng-click="::$ctrl.showAppointmentDialog(master)">
                        Записатись
                    </md-button>

        </div>
        <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
             flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/></div>
        </md-card-content>
        </md-card>
        <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
            <md-card-content layout="row" layout-align="start none">
                <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
                     flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/>
                </div>
                <div class="card-desc box" flex="50"
                     flex="50" layout="column" layout-align="space-around center">
                    <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                         class="corner-ribbon-min top-right white"
                    >
                        {{::master.rate.text}}
                    </div>
                    <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                         class="corner-ribbon-min top-right white"
                    >
                        {{::master.rate.text}}
                    </div>
                    <div layout="row" layout-align="center center" class="md-padding md-margin">
                        <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                        <div hide show-sm="true"
                        ="true" flex="90" class="md-display-1">{{::master.name}}
                    </div>
                </div>
                <div hide show-gt-sm="true" class="md-title">
                    Вибери послугу та запишись
                </div>
                <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                    <div layout="column"
                         ng-repeat="service in master.services.slice(0,12) track by $index"
                         layout-align=" start center">

                        <div class="date-block md-margin "
                             ng-click="::$ctrl.showAppointmentDialog(master,service)"
                             ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                             layout="column"
                             layout-align=" center center">
                        </div>
                        <div class="  md-title date-text capitalize">
                            {{ ::service.favor.name}}
                        </div>
                    </div>
                </div>


                <md-button hide show-sm="true" class="  md-display-1 md-raised  " aria-label="Details"
                           ng-click="::$ctrl.showMaster(master._id)">
                    Про майстра
                </md-button>
                <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  " aria-label="Details"
                           ng-click="::$ctrl.showMaster(master._id)">
                    Про майстра
                </md-button>

                <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                           aria-label="Details"
                           ng-click="::$ctrl.showAppointmentDialog(master)">
                    Записатись
                </md-button>

    </div>

    </md-card-content>
    </md-card>
</div>


<div hide-gt-xs="true" layout="row" layout-align="center center">
    <div class="overlay-bg trigger-right"></div>
    <md-card md-whiteframe="8">
        <md-card-content layout="column">
            <div ng-if="master.rate && master.rate._id!=='0'" class="card-desc-top-master white"
                 flex layout=" column " layout-align=" space-around center">
                <md-card-title>
                    <md-card-title-text flex layout="column" layout-align=" space-around center">
                        <div class="md-headline"> {{::master.rate.text}}</div>
                    </md-card-title-text>
                </md-card-title>
            </div>
            <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"><img ng-src="{{::master.photo.url}}"
                                                                                    class="md-card-image"/></div>
            <div class="card-desc "
                 layout="column" layout-align="center center">
                <md-card-title>
                    <md-card-title-text>
                        <div class="md-display-1 capitalize">{{::master.name}}</div>

                    </md-card-title-text>
                </md-card-title>
                <div class="md-title">
                    Вибери послугу та запишись
                </div>
                <div layout="row" class=" program-block-master  ">
                    <div layout="column"
                         ng-repeat="service in master.services track by $index"
                         layout-align=" start center">

                        <div class="date-block md-margin "
                             ng-click="::$ctrl.showAppointmentDialog(master,service)"
                             ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                             layout="column"
                             layout-align=" center center">
                        </div>

                    </div>
                </div>
                <md-button class=" md-display-1 md-raised " aria-label="Details"
                           ng-click="::$ctrl.showMaster(master._id)">
                    Про майстра
                </md-button>
                <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                           ng-click="::$ctrl.showAppointmentDialog(master)">
                    Записатись
                </md-button>

            </div>
        </md-card-content>

    </md-card>

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
                    <div flex="50" flex-xs="100" class="order-picker-container" layout="row">
                        <md-datepicker  md-min-date="vm.startDate" md-open-on-focus class="order-date-picker" placeholder="Дата" flex ng-model="vm.appointment.date"
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
                <md-input-container ng-if="vm.appointment.master" class="md-block md-padding">
                    <label for="service">Послуга</label>
                    <md-select  ng-model="vm.appointment.service"
                               ng-model-options="{trackBy: '$value._id'}">
                        <md-option ng-repeat="service in vm.appointment.master.services" ng-value="service">
                            <div layout="row" layout-align=" start center  ">
                                <img ng-src="{{service.favor.photo.url}}" class="avatar" alt="{{service.favor.name}}"/>
                                <span>  {{ service.favor.name }}  </span></div>
                        </md-option>
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container ng-if="!vm.appointment.master" class="md-block md-padding">
                    <label for="service">Послуга</label>
                    <div layout="row" layout-align=" start center  ">
                                <img ng-src="{{vm.appointment.favor.photo.url}}" class="avatar" alt="{{vm.appointment.favor.name}}"/>
                                <span>  {{ vm.appointment.favor.name }}  </span></div>
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
    startDate = new Date();
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

export class MastersComponentController {

    static $inject = ["$location", MasterResourceName, '$mdDialog', '$rootScope', "$log", AppointmentResourceName];
    masters: IMaster[];
    private appointment: IAppointment;

    constructor(private $location: ng.ILocationService,
                private masterResource: IMasterResource, private mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private $log: ng.ILogService, private AppointmentResource: IAppointmentResource) {

    }

    $onInit() {

        this.masters = this.masterResource.query({sort: {"isTop": 1, "order": 1}, populate: 'services.favor'})
        this.appointment = new this.AppointmentResource();

    }

    showMaster(id) {
        this.$location.path(`/master/${id}`);
    }

    showAppointmentDialog(master, service = null) {
        this.appointment.master = master;
        this.appointment.service = service;
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

export let MastersComponentUrl = "/masters";
export let MastersComponentName = 'pgMasters';
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};