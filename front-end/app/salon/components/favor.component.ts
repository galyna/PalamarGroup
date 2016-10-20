import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";

const template = `<div class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div class="course-bg " layout-align="center center" flex>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                       
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-md="true" class="md-display-2">{{::$ctrl.favor.name}}</div>
                                    <div hide-md="true" class="md-display-1">{{::$ctrl.favor.name}}</div>
                                    <div class="favor-container ">
                                        <div class="md-title">{{::$ctrl.favor.description}}</div>

                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(product)">
                                    Записатись
                                </md-button>
                            </md-card-actions>
                        </div>
                         <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::$ctrl.favor.photo.url}}" class="md-card-image "/>
                        </div>
                    </md-card-content>
                </md-card>

            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::$ctrl.favor.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::$ctrl.favor.name}}</div>
                                    <div class="md-title">{{::$ctrl.favor.description}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                       ng-click="$ctrl.showAppointmentDialog(product)">
                                Записатись
                            </md-button>
                        </div>
                    </md-card-content>

                </md-card>

            </div>
        </div>
        <div layout="row" ng-if="$ctrl.masters.length>0" flex>
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> Майстри</div>
                </div>

            </div>
        </div>

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::master.photo.url}}" class="md-card-image "/>
                        </div>
                          <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-md="true" class="md-display-2">{{::$ctrl.favor.name}}</div>
                                    <div hide-md="true" class="md-display-1">{{::$ctrl.favor.name}}</div>
                                    <div >
                                         <md-button class="  md-display-1 md-raised  " aria-label="Details"
                                          ng-click="$ctrl.showMaster(master._id)">
                                    Про майстра
                                </md-button>

                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class=" near-master xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(product)">
                                    Записатись
                                </md-button>
                            </md-card-actions>
                        </div>
                         </md-card-content>
                </md-card>

            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::master.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="center center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::master.name}}</div>
                                    <div class="md-title">{{::master.description}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class=" md-display-1 md-raised " aria-label="Details"
                                       ng-click="$ctrl.showMaster(master._id)">
                                Про майстра
                            </md-button>
                            <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                       ng-click="$ctrl.showAppointmentDialog(product)">
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

    static $inject = ["$routeParams", '$mdDialog', "$location",
        FavorResourceName, MasterResourceName];

    favor:IFavor;
    masters:IMaster[];

    constructor(private $routeParams:ng.route.IRouteParamsService,
                private $mdDialog:ng.material.IDialogService, private $location:ng.ILocationService,
                private favorResource:IFavorResource,
                private masterResource:IMasterResource) {

    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.favorResource.get( {id: this.$routeParams["id"]} ).$promise
                .then( (favor) => {
                    this.favor = favor;

                } );
            this.masterResource.query().$promise
                .then( (masters) => {
                    this.masters = masters.filter( (master)=> {

                        return master.services.some( (s)=> {
                            return s.favor == this.$routeParams["id"];
                        } );
                    } )
                } );
        }
    }

    showMaster(id) {
        this.$location.path( `/master/${id}` );
    }


}

export let FavorComponentUrl = "/favor/:id";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};