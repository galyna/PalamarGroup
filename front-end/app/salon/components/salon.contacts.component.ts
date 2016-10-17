import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import {SalonResourceName, ISalonResource, ISalon} from "../../resources/salon.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";
import {ISchedulerScope} from "../../admin/salon/components/master.scheduler";


const template = `<div class="salon-contacts description-container" layout="column">

    <!--author-->
    <div layout="column" layout-align="center center" ng-repeat="salon in $ctrl.salons">
        <div layout="row" flex ng-if="salon.contacts.length>0">
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-1"> Салон {{salon.name}}</div>
                    <div class="md-display-1"> знаходиться на {{salon.address}}</div>
                </div>

            </div>
        </div>
        <ui-gmap-google-map ng-if="$ctrl.showMap && salon.map" id="map"
                            center='{ latitude: salon.latitude, longitude: salon.longitude}' zoom='$ctrl.map.zoom'>
            <ui-gmap-marker coords="{ latitude: salon.latitude, longitude: salon.longitude}" idkey="$index">
              
            </ui-gmap-marker>
            </ui-gmap-markers>
        </ui-gmap-google-map>
        <div class="course-bg " layout-align="center center" flex
             ng-repeat="contact in salon.contacts track by $index">
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::contact.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div class="md-title">Адміністратор</div>
                                    <div class="md-display-1">{{::contact.name}}</div>
                                    <div class="descr-container">
                                        <div class="md-display-1">{{::contact.phone}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>

                        </div>
                    </md-card-content>
                </md-card>
                <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div class="md-title">Адміністратор</div>
                                    <div class="md-display-1">{{::contact.name}}</div>
                                    <div class="descr-container">
                                        <div class="md-display-1">{{::contact.phone}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>

                        </div>
                        <div class="card-media " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::contact.photo.url}}" class="md-card-image"/></div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::contact.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div class="md-title">Адміністратор</div>
                                    <div class="md-display-1">{{::contact.name}}</div>
                                    <div class="descr-container">
                                        <div class="md-display-1">{{::contact.phone}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>

                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::contact.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::contact.name}}</div>
                                    <div class="md-headline">{{::contact.phone}}</div>
                                </md-card-title-text>
                            </md-card-title>
                        </div>
                    </md-card-content>

                </md-card>
            </div>
        </div>
    </div>
</div>`;

export class SalonContactsComponentController {

    static $inject = [ContactResourceName, 'constants', '$rootScope', SalonResourceName,"$scope"];

    showAnimation:boolean;
    showMap:boolean;
    contacts:IContact[];
    salons:ISalon[];
    map:any;

    constructor(private contactResource:IContactResource,
                private constants:IConstants, private $rootScope:IRootScope,
                private salonResource:ISalonResource,private $scope:ISchedulerScope) {



    }

    $onInit() {
        this.showAnimation = this.$rootScope.isBigSize;
        this.map = { center: { latitude: 49.811210, longitude: 23.974013}, zoom: 18};
        this.contacts = this.contactResource.query( {query: {'isAcademy': 'false'}} );
        this.contacts.$promise.then( (contacts) => {
            this.salons = this.salonResource.query();

            this.salons.$promise.then( (salons) => {
                this.showMap=true;
                salons.forEach( (salon)=> {
                    if (!salon.contacts) {
                        salon.contacts=[];
                    }

                    contacts.forEach( (contact)=> {
                        if (contact.salon === salon._id) {
                            salon.contacts.push( contact );
                        }
                    } )
                } )

            } )
        } );
    }


}

export let SalonContactsComponentUrl = "/salon/contacts";
export let SalonContactsComponentName = 'pgSalonContacts';
export let SalonContactsComponentOptions = {
    template: template,
    controller: SalonContactsComponentController
};