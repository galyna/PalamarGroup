import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";

const template = `

<div class="courses-details description-container" layout="column">

    <!--author-->
    <div layout="row" class="top-info" flex layout-align="center center">
        <md-card flex-md="90"  flex-gt-md="60"  flex-xs="none" flex md-whiteframe="5">
            <md-card-content layuot="column" layout-gt-sm="row">
               
                <div class=" card-media" layout="column" data-aos="{{{true:'fade-right', false:''}[$ctrl.showAnimation]}}"   data-aos-easing="ease-out-cubic"
                     flex-gt-sm="50" layout-align="center center">
                    <img src="{{$ctrl.master.photo.url}}"/>
                    <div class="md-padding author-name" layout="column" layout-align="space-around center">
                        <div class="md-headline">Майстер</div>
                        <div class="md-headline">{{ ::$ctrl.master.name}}</div>
                    </div>
                </div>
                <div  class="card-desc "  data-aos="{{{true:'fade-left', false:''}[$ctrl.showAnimation]}}"  data-aos-easing="ease-out-cubic" flex-gt-sm="50"
                     layout="column" layout-align=" space-between center">
                    <md-card-title layout="column" layout-align="space-around center">
                        <md-card-title-text hide show-gt-sm="true" flex layout="column"
                                            layout-align=" space-around center">                       
                        </md-card-title-text>
                    </md-card-title>
                    <div flex layuot="column" layout-align="space-between stretch">
                        <md-button class=" md-raised xs-selected " aria-label="Play"
                                   ng-click="$ctrl.showAppointmentDialog($event)">
                            Записатись
                        </md-button>                    
                    </div>
                </div>
            </md-card-content>
        </md-card>

    </div>




    

</div>


`;
const appointmentTemplate = `
<md-dialog class="pop-form-dialog"  aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"  layout="column" >
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 class=" md-padding ">ЗАПИСАТИСЬ НА БЛОК</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex>
        <md-dialog-content>
            <md-dialog-content-body>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                    <label for="name">Як до вас звертатися</label>
                    <input id="name" ng-model="vm.appointment.name" type="text" name="name">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_email_24px"></md-icon>
                    <label for="email">email</label>
                    <input id="email" ng-model="vm.appointment.email" type="text" name="email">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                    <label for="phone">Телефон</label>
                    <input id="phone" ng-model="vm.appointment.phone" type="text" name="phone">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                    <label for="comment">Додаткова інформація</label>
                    <textarea  id="comment" ng-model="vm.appointment.comment"  name="comment"></textarea>
                </md-input-container>
                    <p class=" md-headline">Після запису з Вами звяжеться адміністратор для узгодження деталей</p>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center" >
            <md-button ng-click="vm.save(orderForm)" class=" xs-selected md-raised md-headline">ЗАПИСАТИСЬ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`
class AppointmentDialogController {

    static $inject = ['$mdDialog', 'appointment'];

    private appointment:IAppointment;
    private originalAppointment:IAppointment;

    constructor(private $mdDialog:ng.material.IDialogService, appointment:IAppointment) {
        this.appointment = angular.copy( appointment );
        this.originalAppointment = appointment;
    }

    save(orderForm) {

        angular.extend( this.originalAppointment, this.appointment );
        this.$mdDialog.hide( this.originalAppointment );
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class FavorComponentController {

    static $inject = [];

    constructor() {

    }

}

export let FavorComponentUrl = "";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};