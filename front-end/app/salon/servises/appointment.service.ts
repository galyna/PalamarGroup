/**
 * Created by Galyna on 12.11.2016.
 */
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import {IRootScope} from "../../../typings";

const template =   `<md-dialog class="pop-form-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div  class="md-toolbar-tools md-padding ">
         <h2  hide show-gt-sm='true' class=" md-padding ">Записатись на прйом до майстра {{::vm.appointment.master.name}}</h2>
            <h2 hide-gt-sm='true' class=" md-padding ">Записатись  до {{::vm.appointment.master.name}}</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="::vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" novalidate class="md-padding pop-form" ng-submit="::vm.save(orderForm)" flex>
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
                        <md-datepicker md-open-on-focus class="order-date-picker"  md-min-date="vm.startDate" placeholder="Дата" flex ng-model="vm.appointment.date"
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
                 <md-input-container class="md-block md-padding reduce-bottom-margin ">
                      <md-checkbox  ng-model="vm.appointment.isConsultation">Записатись на консультацію</md-checkbox> 
                </md-input-container>
                <md-input-container ng-if="!vm.appointment.isConsultation"  class="md-block md-padding">
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
                <md-input-container ng-if="!vm.appointment.master" class="md-block ">
                    <label for="service">Послуга</label>
                    <div layout="row" layout-align=" start center  ">
                        <img ng-src="{{vm.appointment.favor.photo.url}}" class="avatar"
                             alt="{{vm.appointment.favor.name}}"/>
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
`;

export class AppointmentFormComponentController {

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

//noinspection ReservedWordAsName
export interface IAppointmentService {
    onShowDialog(appointment: IAppointment): void;
}

export class AppointmentService implements IAppointmentService {

    static $inject = ['$mdDialog', '$rootScope', "$log"];
    static componentName = 'appointmentService';
    private appointment: IAppointment;

    constructor(private $mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private $log: ng.ILogService) {

    }

    onShowDialog(appointment: IAppointment) {

        this.$mdDialog.show({
            template: template,
            clickOutsideToClose: true,
            bindToController: true,
            controller: AppointmentFormComponentController,
            controllerAs: 'vm',
            parent: angular.element(document.body),

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
        result.date = new Date(result.date).toJSON();
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
                .textContent('З вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }


}

