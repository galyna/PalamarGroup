import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";
import {SalonResourceName, ISalonResource} from "../../resources/salon.resource";


const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="salon-contacts description-container" layout="column">

    <!--author-->
    <div layout="column" layout-align="center center" >
    <div class="course-bg " layout-align="center center" flex
         ng-repeat="contact in $ctrl.contacts track by $index">
        <div hide show-gt-xs="true" layout="row" layout-align="center center">

            <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
            >
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-media " 
                       
                         flex="50"><img ng-src="{{::contact.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc " 
                        
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор Академії</div>
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
                    <div class="card-desc " 
                        
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор Академії</div>
                                <div class="md-display-1">{{::contact.name}}</div>
                                <div class="descr-container">
                                    <div class="md-display-1">{{::contact.phone}}</div>
                                </div>
                            </md-card-title-text>
                        </md-card-title>

                    </div>
                    <div class="card-media " 
                        
                         flex="50"><img ng-src="{{::contact.photo.url}}" class="md-card-image"/></div>
                </md-card-content>
            </md-card>
            <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-media " 
                         flex="50"><img ng-src="{{::contact.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc " 
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор Академії</div>
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
                    <div class="card-media "><img ng-src="{{::contact.photo.url}}" class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="space-around center">
                        <md-card-title>
                            <md-card-title-text>
                             <div class="md-headline ">Координатор Академії</div>
                                <div class="md-headline md-padding">{{::contact.name}}</div>
                                <div class="md-headline">{{::contact.phone}}</div>
                            </md-card-title-text>
                        </md-card-title>
                    </div>
                </md-card-content>

            </md-card>
        </div>
    </div>

    <ui-gmap-google-map id="m4ap" layout="row" class="top-info angular-google-map-container-academy"
                        layout-align="center center" center='$ctrl.map.center' zoom='$ctrl.map.zoom'>
        <ui-gmap-marker coords='$ctrl.marker' idkey="8552452588">

        </ui-gmap-marker>
        </ui-gmap-markers>
    </ui-gmap-google-map>
    </div>
</div>
`;

export class AcademyContactComponentController {

    static $inject = [ContactResourceName, '$rootScope', SalonResourceName, '$q'];


    order:IOrder;
    showAnimation:boolean;
    contacts:IContact[];
    map:any;
    marker:any;
    markerReadySEO: string;

    constructor(private contactResource:IContactResource, private $rootScope:IRootScope,
                private salonResource:ISalonResource, private $q) {
        
    }

    $onInit() {
        this.map = {center: {latitude: 49.811077, longitude: 23.973777}, zoom: 18};
        this.marker = {latitude: 49.811077, longitude: 23.973777};
        this.showAnimation = this.$rootScope.isBigSize;
        var mainPromise = this.salonResource.query( {query: {'isAcademy': 'true'}} ).$promise;
        mainPromise.then( (salons) => {
            if (salons.length>0) {
             var academySalon= salons[0];
                this.map.center.latitude=academySalon.latitude;
                this.map.center.longitude=academySalon.longitude;
                this.marker.latitude=academySalon.latitude;
                this.marker.longitude=academySalon.longitude;
            }
        } );
        this.contacts = this.contactResource.query( {query: {'isAcademy': 'true'}} );

        this.$q.all([mainPromise, this.contacts.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }

}
export let AcademyContactComponentUrl = "/academy/contact";
export let AcademyContactComponentName = 'pgAcademyContact';
export let AcademyContactComponentOptions = {
    template: template,
    controller: AcademyContactComponentController
};