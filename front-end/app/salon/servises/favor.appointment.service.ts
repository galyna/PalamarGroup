/**
 * Created by Galyna on 12.11.2016.
 */
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import {IRootScope} from "../../../typings";

const template = `<md-dialog class="appointment-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2 ">
    
        <div class="md-toolbar-tools md-padding ">
          <img ng-src="{{::vm.appointment.favor.photo.url}}" class="avatar"/>
                  
            <span class=" md-padding  md-body-2">Записатись на послугу
                {{::vm.appointment.favor.name}}</span>
          
            <span flex></span>
            <md-button class="md-icon-button dialog-close-btn" ng-click="::vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex ng-submit="::vm.save(orderForm)">
        <md-dialog-content>
            <md-dialog-content-body>
                <div hide show-gt-xs="true">
                    <md-input-container ng-if="!vm.showDetails" id="orderName" class="md-block">

                        <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                        <label for="phone">Телефон</label>
                        <input id="phone" ng-model="vm.appointment.phone" type="text" required name="phone">
                        <div ng-messages="orderForm.phone.$error" role="alert"
                             ng-show="orderForm.$submitted && orderForm.phone.$invalid">
                            <div class="md-headline" ng-message="required">
                                Залиште хоч якусь інформацію про себе, бажано номер телефону
                            </div>
                        </div>

                    </md-input-container>

                    <div layout="row" ng-if="vm.showDetails" >
                        <md-input-container id="orderName" flex="50">
                            <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                            <label for="phone">Телефон</label>
                            <input id="phone" ng-model="vm.appointment.phone" type="text" required name="phone">
                            <div ng-messages="orderForm.phone.$error" role="alert"
                                 ng-show="orderForm.$submitted && orderForm.phone.$invalid">
                                <div class="md-headline" ng-message="required">
                                    Залиште хоч якусь інформацію про себе, бажано номер телефону
                                </div>
                            </div>

                        </md-input-container>
                        <md-input-container flex="50">
                            <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                            <label for="name">Як до вас звертатись?</label>
                            <input id="name" ng-model="vm.appointment.name" type="text" name="name">

                        </md-input-container>
                    </div>
                    <div ng-if="vm.showDetails">
                   
                    <div  flex="100" layout="row">
                        <div flex="50" class="order-picker-container " layout="row">
                            <md-datepicker md-open-on-focus class="order-date-picker" md-min-date="vm.startDate"
                                           placeholder="Дата" flex ng-model="vm.appointment.date"
                                           ng-change="vm.onCalendarChanged()"
                                           name="dateField"></md-datepicker>

                        </div>
                        <div flex="50" class="time-container " layout="row">
                            <md-input-container flex>
                                <md-icon md-svg-icon="action:ic_schedule_24px"></md-icon>
                                <label for="time">Час</label>
                                <md-select name="time" id="time" ng-model="vm.dayHour"
                                           ng-model-options="{trackBy: '$value.id'}">
                                    <md-option ng-repeat="hour in vm.dayHours" ng-value="hour">
                                        {{ hour.value }}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                    </div>

                    <div flex layout="row">
                        <md-input-container flex="50" ng-if="!vm.appointment.isConsultation">
                             <label for="service">Майстер</label>
                        <md-select ng-model="vm.appointment.master" id="service"
                                  >
                            <md-option ng-repeat="master in vm.appointment.masters" ng-value="master">
                                <div layout="row" layout-align=" start center  ">
                                    <img ng-src="{{master.photo.url}}" class="avatar"
                                         alt="{{master.name}}"/>
                                    <span>  {{ master.name }}  </span></div>
                            </md-option>
                            
                        </md-select>
                    
                        </md-input-container>
                        <md-input-container style="padding-bottom:0;padding-left: 5px;" class='md-padding' flex="50"

                                            class=" reduce-bottom-margin">
                            <md-checkbox ng-model="vm.appointment.isConsultation">Записатись на консультацію
                            </md-checkbox>

                        </md-input-container>
                    </div>

                    <md-input-container class="md-block" class='md-margin'>
                        <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                        <label for="comment">Додаткова інформація</label>
                        <textarea id="comment" ng-model="vm.appointment.comment" name="comment"></textarea>
                    </md-input-container>
                </div>
                    <div flex layout="row" ng-if="!vm.showDetails" class="" ng-click="vm.showDetails=true">
                        Показати більще
                        <md-button class=" md-icon-button" style="margin-top: -15px; padding: 10px">
                            <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                        </md-button>
                    </div>
                    <div flex layout="row" ng-if="vm.showDetails" ng-click="vm.showDetails=false">
                        Згорнути
                        <md-button class=" md-icon-button hide-form-btn" style="margin-top: -15px; padding: 10px">
                            <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                        </md-button>
                    </div>
                </div>
                <div hide-gt-xs="true">

                    <md-input-container id="orderName" class="md-block">
                       <label for="phone">Телефон</label>
                            <input id="phone" ng-model="vm.appointment.phone" type="text" required name="phone">
                            <div ng-messages="orderForm.phone.$error" role="alert"
                                 ng-show="orderForm.$submitted && orderForm.phone.$invalid">
                                <div class="md-headline" ng-message="required">
                                    Залиште хоч якусь інформацію про себе, бажано номер телефону
                                </div>
                            </div>

                    </md-input-container>
<div ng-if="vm.showDetails">
                    <md-input-container class="md-block">
                       <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                        <label for="name">Як до вас звертатись?</label>
                        <input id="name" ng-model="vm.appointment.name" type="text" name="name" >
                        
                    </md-input-container>
                    <div ng-if="vm.$mdMedia('(min-width: 400px)')" flex="100" layout="row">
                        <div flex="50" class="order-picker-container " layout="row">
                            <md-datepicker md-open-on-focus class="order-date-picker" md-min-date="vm.startDate"
                                           placeholder="Дата" flex ng-model="vm.appointment.date"
                                           ng-change="vm.onCalendarChanged()"
                                           name="dateField"></md-datepicker>

                        </div>
                        <div flex="50" class="time-container " layout="row">
                            <md-input-container flex>
                                <md-icon md-svg-icon="action:ic_schedule_24px"></md-icon>
                                <label for="time">Час</label>
                                <md-select name="time" id="time" ng-model="vm.dayHour"
                                           ng-model-options="{trackBy: '$value.id'}">
                                    <md-option ng-repeat="hour in vm.dayHours" ng-value="hour">
                                        {{ hour.value }}
                                    </md-option>
                                </md-select>
                            </md-input-container>
                        </div>
                    </div>
                    <md-input-container ng-if="vm.$mdMedia('(max-width: 400px)')" layout="row" class="xs-master-calendar" flex layout-align="center center" >
                        <label style='left:38px' for="time">Дата</label>
                       <md-datepicker md-open-on-focus class="order-date-picker" md-min-date="vm.startDate"
                                           placeholder="Дата" flex ng-model="vm.appointment.date"
                                           ng-change="vm.onCalendarChanged()"
                                           name="dateField"></md-datepicker>
                    </md-input-container>

                    <md-input-container ng-if="vm.$mdMedia('(max-width: 400px)')" class="md-block md-padding">
                        <md-icon md-svg-icon="action:ic_schedule_24px"></md-icon>
                        <label for="time">Час</label>
                        <md-select name="time" id="time" ng-model="vm.dayHour">
                            <md-option ng-repeat="hour in vm.dayHours" ng-value="hour">
                                {{ hour.value }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                    
                    <md-input-container class="md-block" >
                        <label for="service">Майстер</label>
                        <md-select ng-model="vm.appointment.master" id="service"
                                  >
                            <md-option ng-repeat="master in vm.appointment.masters" ng-value="master">
                                <div layout="row" layout-align=" start center  ">
                                    <img ng-src="{{master.photo.url}}" class="avatar"
                                         alt="{{master.name}}"/>
                                    <span>  {{ master.name }}  </span></div>
                            </md-option>
                            
                        </md-select>
                    </md-input-container>

                    <md-input-container style="padding-bottom:0;padding-left: 5px;" class="md-block " >
                            <md-checkbox ng-model="vm.appointment.isConsultation">Записатись на консультацію
                            </md-checkbox>

                        </md-input-container>
                    
                    <md-input-container class="md-block" >
                        <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                        <label for="comment">Додаткова інформація</label>
                        <textarea id="comment" ng-model="vm.appointment.comment" name="comment"></textarea>
                    </md-input-container>
                 </div>
                    <div flex layout="row" ng-if="!vm.showDetails" class="" ng-click="vm.showDetails=true">
                        Показати більще
                        <md-button class=" md-icon-button" style="margin-top: -15px; padding: 10px">
                            <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                        </md-button>
                    </div>
                    <div flex layout="row" ng-if="vm.showDetails" ng-click="vm.showDetails=false">
                        Згорнути
                        <md-button class=" md-icon-button hide-form-btn" style="margin-top: -15px; padding: 10px">
                            <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                        </md-button>
                    </div>
                </div>

                </md-dialog-content-body>
        </md-dialog-content>

        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            <md-button type="submit" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>

`;

export class FavorAppointmentFormComponentController {

    static $inject = ['$mdDialog', '$mdMedia'];
    private appointment: IAppointment;
    startDate = new Date();
    dayHour: any;
    reservhouers: any;
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

    constructor(private $mdDialog: ng.material.IDialogService, private $mdMedia) {

        this.reservhouers = angular.copy(this.dayHours);
        this.setTime();

    }

    onCalendarChanged() {
        var current = new Date()
        if (this.appointment.date && this.appointment.date instanceof Date &&
            this.appointment.date.getDay() == current.getDay() &&
            this.appointment.date.getMonth() == current.getMonth() &&
            this.appointment.date.getFullYear() == current.getFullYear()) {
            console.log("today");
            var currentHouer = current.getHours();
            var tmp = angular.copy(this.reservhouers);

            this.reservhouers.forEach((hour) => {
                var time = hour.value.split(':')[0];
                if (parseInt(time) <= currentHouer) {
                    tmp.shift();
                }
                if (this.dayHour && parseInt(time) <= currentHouer && hour.id == this.dayHour.id) {
                    this.dayHour = null;
                }
            })
            this.dayHours = [];
            this.dayHours = tmp;
            console.log(this.dayHours.length);
        }
    }

    setTime() {

        if (this.appointment.date) {
            var minutes = this.appointment.date.getUTCMinutes();
            var hourValue = this.appointment.date.getUTCHours() + ':' + (  (minutes < 10) ? minutes + '0' : minutes);
            this.dayHours.forEach((hour) => {
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
            if (this.appointment.master) {
                var services = this.appointment.master.services.filter((fav) => {
                   return fav.favor._id == this.appointment.favor._id;
                })
                if (services.length > 0) {
                    this.appointment.service = services[0];
                }
            }
            this.$mdDialog.hide(this.appointment);
        }
    }



    cancel() {
        this.$mdDialog.cancel();
    }

}

//noinspection ReservedWordAsName
export interface IAppointmentService {
    onShowDialog(appointment: IAppointment): void;
}
export let FavorAppointmentServiceName = 'favorAppointmentService'
export class FavorAppointmentService implements IAppointmentService {

    static $inject = ['$mdDialog', '$rootScope', "$log", '$mdMedia'];

    constructor(private $mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private $log: ng.ILogService, private $mdMedia) {

    }

    onShowDialog(appointment: IAppointment) {

        this.$mdDialog.show({
            template: template,
            bindToController: true,
            controller: FavorAppointmentFormComponentController,
            controllerAs: 'vm',
            parent: angular.element(document.body),
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
            locals: {
                appointment: appointment,
            },
        }).then((result) => {
            this.handleDialogResult(result);
        });
        ;
    }

    handleDialogResult(result: IAppointment) {
        if (result.service) {
            result.favors = [];
            result.favors.push(result.service);
        }
        result.creationDate = new Date().toJSON();
        if (result.date) {
            result.date = new Date(result.date).toJSON();
        }

        result.$save()
            .then(() => {
                this.$mdDialog.hide();
                this.showOrderConfirm();
            })
            .catch((err) => {
                this.$log.error(err);
            })
            .finally(() => {
                this.$rootScope.loading = false;
            });
    }

    showOrderConfirm(): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу запис прийнято. ')
                .textContent('На протязі робочого дня з вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }


}

