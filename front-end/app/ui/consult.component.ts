/**
 * Created by Galyna on 12.11.2016.
 */
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../resources/appointment.resource";
import {IRootScope} from "../../typings";

const template = `<div ng-click="$ctrl.consultShow()" class="consult-container"
     layout="row"
     layout-align="center center ">
    <div hide-gt-xs="true" class="stop-label">
        <md-icon md-svg-icon="communication:ic_chat_bubble_24px"></md-icon>
    </div>
    
    <div hide show-gt-xs="true" class="stop-label">КОНСУЛЬТАЦІЯ</div>

</div>
`;
const dialogtemplate = `<md-dialog class="appointment-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 class=" md-padding ">Записатись на консультацію
                {{::vm.appointment.master.name}}</h2>

            <span flex></span>
            <md-button class="md-icon-button dialog-close-btn" ng-click="::vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex ng-submit="::vm.save(orderForm)">
        <md-dialog-content>
            <md-dialog-content-body>
                <md-input-container class="md-block" flex>
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

                <div ng-if="vm.showDetails">
                    <md-input-container class="md-block" id="orderName" flex>
                        <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                        <label for="name">Як до вас звертатись?</label>
                        <input id="name" ng-model="vm.appointment.name" type="text" name="name">

                    </md-input-container>
                    <md-input-container class="md-block">
                        <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                        <label for="comment">Додаткова інформація</label>
                        <textarea id="comment" ng-model="vm.appointment.comment" name="comment"></textarea>
                    </md-input-container>
                </div>
                <div flex layout="row" ng-if="!vm.showDetails" class="" ng-click="vm.showDetails=true">
                    Показати більще
                    <md-button class=" md-icon-button"  style="margin-top: -15px; padding: 10px">
                        <md-icon  md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                    </md-button>
                </div>
                    <div flex layout="row" ng-if="vm.showDetails"  ng-click="vm.showDetails=false">
                        Згорнути
                        <md-button class=" md-icon-button hide-form-btn" style="margin-top: -15px; padding: 10px" >
                            <md-icon   md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                        </md-button>
                </div>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            
            <md-button type="submit" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>`;

export class ConsultFormComponentController {

    static $inject = ['$mdDialog'];
    private appointment: IAppointment;
showDetails:boolean;
    constructor(private $mdDialog: ng.material.IDialogService) {

    }


    save(orderForm) {

        if (this.appointment.name || this.appointment.comment || this.appointment.phone) {

            this.$mdDialog.hide(this.appointment);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }

}


export class ConsultComponentController {


    static $inject = ['$mdDialog', '$rootScope', "$log", '$mdMedia', AppointmentResourceName];

    constructor(private $mdDialog: ng.material.IDialogService,
                private $rootScope: IRootScope, private $log: ng.ILogService,
                private $mdMedia, private AppointmentResource: IAppointmentResource) {

    }

    consultShow() {
        var appointment = new this.AppointmentResource();
        appointment.isConsultation = true;
        this.$mdDialog.show({
            template: dialogtemplate,
            bindToController: true,
            controller: ConsultFormComponentController,
            controllerAs: 'vm',
            parent: angular.element(document.body),

          //  parent: angular.element(document.querySelector('#pageContainer')),
            fullscreen: this.$mdMedia('(max-width: 360px)'),
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
                .textContent('З вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }


}


export let ConsultComponentName = 'pgConsult';
export let ConsultComponentOptions = {
    template: template,
    controller: ConsultComponentController
};
/**
 * Created by ostap on 26.11.16.
 */
