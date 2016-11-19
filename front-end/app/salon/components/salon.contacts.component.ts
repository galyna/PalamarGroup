import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import {SalonResourceName, ISalonResource, ISalon} from "../../resources/salon.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";
import {ISchedulerScope} from "../../admin/salon/components/master.scheduler";
import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";


const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="salon-contacts description-container" layout="column">

    <!--author-->
    <div layout="column" layout-align="center center" ng-repeat="salon in $ctrl.salons">
        <div layout="row" flex >
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">                  
                    <div class="md-display-1"> Адреса салону {{::salon.address}}</div>
                     <div class="md-title md-padding"> {{::salon.description}}</div>
                </div>

            </div>
        </div>
       
        <div class="course-bg " layout-align="center center" flex
             ng-repeat="contact in ::salon.contacts track by $index">
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
                        <div class="card-desc " 
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
                        <div class="card-media "><img ng-src="{{::contact.photo.url}}" class="md-card-image"/></div>
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
         <ui-gmap-google-map ng-if="$ctrl.showMap && salon.latitude && salon.longitude" id="map"
                            center='{ latitude: salon.latitude, longitude: salon.longitude}' zoom='$ctrl.map.zoom'>
            <ui-gmap-marker coords="{ latitude: salon.latitude, longitude: salon.longitude}" idkey="$index">
              
            </ui-gmap-marker>
            </ui-gmap-markers>
        </ui-gmap-google-map>
         <div flex="100" class="courses-details" layout="row" layout-align="center center"
         >
        <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="photo in ::salon.photos track by $index"
                         class="md-margin "
                         flex-gt-sm="22"
                         flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMediaObserver(salon.photos, $index)">                   
                        <img ng-src="{{::photo.url}}" class="md-card-image">                 
                    <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::photo.name}}</span>
                    </md-card-content>
            </div>
        </div>
    </div>
    <div class="courses-details" layout="row" flex layout-align="center center" ng-if="salon.videos.length>0">
        <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
            <div layout="column" layout-margin class="embed-responsive-container" layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos"
                         ng-repeat="video in ::salon.videos track by $index"
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
    </div>
</div>`;

export class SalonContactsComponentController {

    static $inject = [ContactResourceName, '$rootScope', SalonResourceName, "$scope",
        MediaObserverFactoryName, 'constants', 'smoothScroll',SeoPageResourceName,"$q"];

    showAnimation: boolean;
    showMap: boolean;
    contacts: IContact[];
    salons: ISalon[];
    map: any;
    socialParams:any;
    markerReadySEO: string;
    seo:any;

    constructor(private contactResource: IContactResource,
                private $rootScope: IRootScope,
                private salonResource: ISalonResource, private $scope: ISchedulerScope,
                private mediaObserver: IMediaObserverFactory,
                private constants: IConstants, private smoothScroll,private SeoPageResource:ISeoPageResource, private $q) {


    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host  +SalonContactsComponentUrl;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
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

    scrollToMain() {
        var options = {
            duration: 100,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    $onInit() {
        this.seo = this.SeoPageResource.query({query: {"name": "academy.contacts"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });

        this.map = {center: {latitude: 49.811210, longitude: 23.974013}, zoom: 18};
        this.contacts = this.contactResource.query({query: {'isAcademy': 'false'}});
        this.contacts.$promise.then((contacts) => {
            this.scrollToMain();
            this.salons = this.salonResource.query({sort: '-isMain'});

            this.salons.$promise.then((salons) => {
                this.showMap = true;
                salons.forEach((salon)=> {
                    if (!salon.contacts) {
                        salon.contacts = [];
                    }
                    if (salon.isMain) {
                        this.map.center.latitude = salon.latitude;
                        this.map.center.longitude = salon.longitude;
                    }
                    contacts.forEach((contact)=> {
                        if (contact.salon === salon._id) {
                            salon.contacts.push(contact);
                        }

                    })
                })

            })
        });

        this.$q.all([this.contacts.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }


}

export let SalonContactsComponentUrl = "/beauty-parlour/contacts";
export let SalonContactsComponentName = 'pgSalonContacts';
export let SalonContactsComponentOptions = {
    template: template,
    controller: SalonContactsComponentController
};