import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;

import {IOrder,} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";
import {SalonResourceName, ISalonResource} from "../../resources/salon.resource";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";


const template = `
<sb-jsonld json="{{$ctrl.seoJson}}"></sb-jsonld>
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="salon-contacts description-container" layout="column">
   <div layout="row" flex >
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">                  
                    <div class="md-display-1"> Адреса {{$ctrl.salon.address}}</div>
                      <div class="md-title md-padding"> {{$ctrl.salon.description}}</div>
                </div>

            </div>
        </div>
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

    static $inject = [ContactResourceName, SalonResourceName, '$q', 'smoothScroll', SeoPageResourceName, '$rootScope'];

    contacts: IContact[];
    map: any;
    marker: any;
    markerReadySEO: string;
    seo: any;
    salon: any;
    seoJson: any;

    constructor(private contactResource: IContactResource,
                private salonResource: ISalonResource, private $q, private smoothScroll,
                private SeoPageResource: ISeoPageResource, private $rootScope) {

    }

    $onInit() {
        this.initSeo();
        this.seo = this.SeoPageResource.query({query: {"name": "academy.contacts"}}).$promise.then((seo) => {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
                this.seoJson.description = seo[0].description ? seo[0].description : this.seoJson.description;
            }

        });
        this.map = {center: {latitude: 49.811077, longitude: 23.973777}, zoom: 18};
        this.marker = {latitude: 49.811077, longitude: 23.973777};

        var mainPromise = this.salonResource.query({query: {'isAcademy': 'true'}}).$promise;
        mainPromise.then((salons) => {
            this.scrollToMain();
            if (salons.length > 0) {
                this.salon = salons[0];
                this.map.center.latitude = this.salon.latitude;
                this.map.center.longitude = this.salon.longitude;
                this.marker.latitude = this.salon.latitude;
                this.marker.longitude = this.salon.longitude;
            }
        });
        this.seoJson.contactPoint = [];
        this.contacts = this.contactResource.query({query: {'isAcademy': 'true'}});
        this.contacts.$promise.then((contacts) => {
            contacts.forEach((contact) => {
                this.seoJson.telephone = contact.phone;
                this.seoJson.contactPoint.push({
                    "@type": "ContactPoint",
                    "telephone": contact.phone,
                    "contactType": "customer service",
                    "image": "http://palamar.com.ua" + contact.photo.url
                });
            })
        });
        this.$q.all([mainPromise, this.contacts.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }

    initSeo() {
        this.seoJson = {
            "@context": "http://www.schema.org",
            "@type": "EducationalOrganization",
            "name": "PALAMAR GROUP ACADEMY",
            "url": "http://palamar.com.ua/academy",
            "founder": {
                "@context": "http://schema.org/",
                "@type": "Person",
                "name": "YULIA PALAMAR"
            },
            "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
            "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
            "description": "Навчання для працівників салонів краси, Теми: чоловічі та жіночі стрижки, fassion-style, колористика ",
            "areaServed": {
                "@context": "http://schema.org/",
                "@type": "AdministrativeArea",
                "name": "Львів"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                "addressLocality": "Львів, Україна",
                "addressCountry": "Україна"
            },
            "brand": {
                "@context": "http://schema.org/",
                "@type": "Brand",
                "url": "http:/palamar.com.ua/",
                "alternateName": "PALAMAR",
                "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
                "description": "Салон краси у Львуві. Послуги: стрижки, зачіски,фарбування, манікюр, візаж, мейкап, педікюр. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, манікюру, візажу, педікюру",
                "name": "PALAMAR GROUP"
            }
        }
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
}
export let AcademyContactComponentUrl = "/academy/contacts";
export let AcademyContactComponentName = 'pgAcademyContact';
export let AcademyContactComponentOptions = {
    template: template,
    controller: AcademyContactComponentController
};