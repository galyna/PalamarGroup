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


const template = `

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": {
      "@id": "http://palamar.com.ua/beauty-salon",
      "name": "Салон",
      "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg"
    }
  },{
    "@type": "ListItem",
    "position": 2,
    "item": {
      "@id": "http://palamar.com.ua/beauty-salon/contacts",
      "name": "Контакти"
    }
  }]
}
</script>
 <sb-jsonld json="{{::$ctrl.seoJson}}"></sb-jsonld>
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="salon-contacts description-container" layout="column"
 itemscope itemtype="http://schema.org/BeautySalon">

    <div layout="column" layout-align="center center" ng-repeat="salon in $ctrl.salons">
        <div itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
                    <meta itemprop="latitude" content="{{salon.latitude}}"/>
                    <meta itemprop="longitude" content="{{salon.longitude}}"/>
                     <meta itemprop="addressLocality" content="{{salon.description}}"/>
                </div>
        <div layout="row"  >
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div itemprop="address" class="md-display-1"> Адреса салону {{::salon.address}}</div>
                    <div itemprop="address" class="md-title md-padding"> {{::salon.description}}</div>
                </div>

            </div>
        </div>

        <div ng-repeat="contact in ::salon.contacts track by $index">
            <div hide show-gt-xs="true" layout="row" layout-align="center center" >

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
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
                <md-card ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc "
                             flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div class="md-title">Адміністратор</div>
                                    <div class="md-display-1">{{::contact.name}}</div>
                                    <div class="descr-container">
                                        <div itemprop="telephone" class="md-display-1">{{::contact.phone}}</div>
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
                                    <div  itemprop="telephone" class="descr-container">
                                        <div class="md-display-1">{{::contact.phone}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>

                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center" itemscope itemtype="http://schema.org/ContactPoint">

                <md-card md-whiteframe="8">
                    <md-card-content layout="column" itemscope itemtype="http://schema.org/Person">
                        <div  itemprop="image" class="card-media "><img ng-src="{{::contact.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div  itemprop="name" class="md-headline">{{::contact.name}}</div>
                                    <div itemprop="telephone" class="md-headline">{{::contact.phone}}</div>
                                </md-card-title-text>
                            </md-card-title>
                        </div>
                    </md-card-content>

                </md-card>
            </div>


        </div>

        <div layout="row" >

            <ui-gmap-google-map ng-if="$ctrl.showMap && salon.latitude && salon.longitude" id="map"
                                center='{ latitude: salon.latitude, longitude: salon.longitude}'
                                zoom='$ctrl.map.zoom'>
                <ui-gmap-marker coords="{ latitude: salon.latitude, longitude: salon.longitude}" idkey="$index">

                </ui-gmap-marker>
               
            </ui-gmap-google-map>
        </div>

        <div class="courses-details" layout="row" layout-align="center center" flex ng-if="salon.photos.length>0">
            <div flex flex-gt-md="70" flex-md="80" flex-gt-xs="85">
                <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" ng-repeat="photo in ::salon.photos track by $index" itemscope itemtype="http://schema.org/ImageObject"
                             class="md-margin "
                             flex-gt-sm="22"
                             flex-gt-xs="46" flex-xs="80"
                             ng-click="::$ctrl.showMediaObserver(salon.photos, $index)">
                        <img ng-src="{{::photo.url}}" class="md-card-image" itemprop="contentUrl" >
                        <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                            <span itemprop="caption" class="  md-margin">{{::photo.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>

        <div ng-if="salon.videos.length>0" flex style="padding-bottom:16px;" >
            <div flex="100" flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
                <div layout="column"   layout-align="center center" class="embed-responsive-container" >
                    <md-card md-whiteframe="6" class="  courses-videos"
                             ng-repeat="video in ::salon.videos track by $index"
                             flex>
                         <div itemprop="creator" itemscope itemtype="http://schema.org/BeautySalon">
                            <meta itemprop="name" content="PALAMAR GROUP"/>
                            <meta itemprop="image"
                                  content="http://palamar.com.ua/content/images/logo/palamar_logo.png"/>
                            <meta itemprop="address" content="Львів"/>
                        </div>
                        <meta itemprop="image" content="http://img.youtube.com/vi/{{video.url}}/mqdefault.jpg"/>
                        <div flex class="embed-responsive embed-responsive-16by9"
                             class="embed-responsive embed-responsive-16by9" itemscope
                             itemtype="http://schema.org/VideoObject">
                            <meta itemprop="description" content="{{::video.name}}"/>
                            <meta itemprop="name" content="{{::video.name}}"/>
                            <meta itemprop="thumbnailUrl"
                                  content="http://img.youtube.com/vi/{{video.url}}/mqdefault.jpg"/>
                            <meta itemprop="embedUrl" content="https://www.youtube.com/embed/{{video.url}}"/>
                            <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                           video-id="::video.url"></youtube-video>
                        </div>
                        <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                            <span itemprop="name" class="  md-margin">{{::video.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>

        </div>
        
        
        
    </div>
</div>`;

export class SalonContactsComponentController {

    static $inject = [ContactResourceName, '$rootScope', SalonResourceName, "$scope",
        MediaObserverFactoryName, 'constants', 'smoothScroll', SeoPageResourceName, "$q"];

    showAnimation: boolean;
    showMap: boolean;
    contacts: IContact[];
    salons: ISalon[];
    map: any;
    socialParams: any;
    markerReadySEO: string;
    seo: any;
    seoJson: any;

    constructor(private contactResource: IContactResource,
                private $rootScope: IRootScope,
                private salonResource: ISalonResource, private $scope: ISchedulerScope,
                private mediaObserver: IMediaObserverFactory,
                private constants: IConstants, private smoothScroll, private SeoPageResource: ISeoPageResource, private $q) {


    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + SalonContactsComponentUrl;
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
        this.initSeo();
        this.seo = this.SeoPageResource.query({query: {"name": "academy.contacts"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
                this.seoJson.description = seo[0].description ? seo[0].description : this.seoJson.description;
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
                    this.seoJson.contactPoinst = [];
                    contacts.forEach((contact)=> {
                        if (contact.salon === salon._id) {
                            salon.contacts.push(contact);
                        }
                        this.seoJson.contactPoinst.push({
                            "@type": "ContactPoint",
                            "telephone": contact.phone,
                            "contactType": "customer service",
                            "image": "http://www.palamar.com.ua" + contact.photo.url
                        });
                    })
                })

            })
        });

        this.$q.all([this.contacts.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }

    initSeo() {
        this.seoJson = {
            "@context": "http://www.schema.org",
            "@type": "BeautySalon",
            "name": "PALAMAR GROUP",
            "alternateName": "PALAMAR",
            "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
            "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
            "url": "http://palamar.com.ua/"
           
        }
    }

}

export let SalonContactsComponentUrl = "/beauty-salon/contacts";
export let SalonContactsComponentName = 'pgSalonContacts';
export let SalonContactsComponentOptions = {
    template: template,
    controller: SalonContactsComponentController
};