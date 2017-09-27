import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";
import {IRootScope} from "../../../typings";

const template: string = `<script type="application/ld+json">
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
    "@id": "http://palamar.com.ua/beauty-salon/masters",
    "name": "Команда"
    }
    }]
    }
</script>

<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses description-container" layout="row"
     layout-align="center center">
    <div layout="column" layout-align="center center">

        <div layout="row" flex>
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> КОМАНДА</div>
                </div>

            </div>
        </div>

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>
            <sb-jsonld json="{{::master.seoJson}}"></sb-jsonld>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">

                        <div class="card-media " flex="50">
                            <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
                                <img ng-src="{{master.photo.url}}"
                                     alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                     class="md-card-image clickable-element "/>
                            </a>
                        </div>

                        <div class="card-desc "
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }" 
                                 class="corner-ribbon top-right white">{{::master.rate.text}}</div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }" 
                                 class="corner-ribbon-min top-right white">{{::master.rate.text}}</div>
                            <div layout="row" layout-align="center center" class="md-padding ">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">
                                    {{::master.name}}
                                </div>
                                <div hide show-sm="true" flex="90" class="md-headline capitalize">{{::master.name}}
                                </div>
                            </div>
                            <div hide show-gt-sm="true" class="md-title">
                                Вибери послугу та запишись
                            </div>
                            <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                                <div layout="column"
                                     ng-repeat="service in master.services.slice(0,12) track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>
                                    <div class="   md-title capitalize date-text">
                                        {{ ::service.favor.name}}
                                    </div>
                                </div>
                            </div>

                            <a hreflang="uk" hide show-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button md-display-1 md-raised "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>

                            <a hreflang="uk" hide show-gt-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button xs-selected md-display-1 md-raised  "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>


                            <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       ng-click="::$ctrl.showAppointmentDialog(master)">
                                Записатись
                            </md-button>

                        </div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc  box"
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }"
                                 class="corner-ribbon top-left white"
                            >{{::master.rate.text}}</div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }"
                                 class="corner-ribbon-min top-left white"
                            >{{::master.rate.text}}</div>
                            <div layout="row" layout-align="center center" class="md-padding md-margin">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">
                                    {{::master.name}}
                                </div>
                                <div hide show-sm="true" flex="90" class="md-headline capitalize">{{::master.name}}
                                </div>
                            </div>

                            <div hide show-gt-sm="true" class="md-title">
                                Вибери послугу та запишись
                            </div>
                            <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                                <div layout="column"
                                     ng-repeat="service in master.services.slice(0,12) track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master,service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>
                                    <div class="  md-title date-text capitalize">
                                        {{ ::service.favor.name}}
                                    </div>
                                </div>
                            </div>

                            <a hreflang="uk" hide show-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button md-display-1 md-raised "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>

                            <a hreflang="uk" hide show-gt-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button xs-selected md-display-1 md-raised  "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>


                            <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       ng-click="::$ctrl.showAppointmentDialog(master)">
                                Записатись
                            </md-button>

                        </div>
                        <div class="card-media "
                             flex="50">
                            <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
                            <img ng-src="{{master.photo.url}}"
                                 alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                 class="md-card-image clickable-element "/>
                        </a>
                        </div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">

                        <div class="card-media "
                             flex="50"><a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
                            <img ng-src="{{master.photo.url}}"
                                 alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                 class="md-card-image clickable-element "/>
                        </a>
                        </div>
                        <div class="card-desc box" flex="50"
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }"
                                 class="corner-ribbon-min top-right white"
                            >{{::master.rate.text}}</div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 ng-class="{ 'two-lines': master.rate.text.indexOf('\r\n') >= 0 }"
                                 class="corner-ribbon-min top-right white"
                            >{{::master.rate.text}}</div>
                            <div layout="row" layout-align="center center" class="md-padding md-margin">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">
                                    {{::master.name}}
                                </div>
                                <div hide show-sm="true" flex="90" class="md-headline capitalize">{{::master.name}}
                                </div>
                            </div>
                            <div hide show-gt-sm="true" class="md-title">
                                Вибери послугу та запишись
                            </div>
                            <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                                <div layout="column"
                                     ng-repeat="service in master.services.slice(0,12) track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master,service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>
                                    <div class="  md-title date-text capitalize">
                                        {{ ::service.favor.name}}
                                    </div>
                                </div>
                            </div>


                            <a hreflang="uk" hide show-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button md-display-1 md-raised "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>

                            <a hreflang="uk" hide show-gt-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button xs-selected md-display-1 md-raised  "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>


                            <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       ng-click="::$ctrl.showAppointmentDialog(master)">
                                Записатись
                            </md-button>

                        </div>

                    </md-card-content>
                </md-card>
            </div>


            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8">
                    <md-card-content layout="column">
                        <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
                            <div ng-if="master.rate && master.rate._id!=='0'" class="card-desc-top-master white"
                                 flex layout=" column " layout-align=" space-around center">
                                <md-card-title>
                                    <md-card-title-text flex layout="column" layout-align=" space-around center">
                                        <div class="md-headline capitalize white-space-pre"> {{::master.rate.text}}</div>
                                    </md-card-title-text>
                                </md-card-title>
                            </div>
                            <div class="card-media "><img
                                    alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                    ng-src="{{::master.photo.url}}"
                                    class="md-card-image"/></div>
                        </a>
                        <div class="card-desc "
                             layout="column" layout-align="center center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1 capitalize">{{::master.name}}</div>

                                </md-card-title-text>
                            </md-card-title>
                            <div class="md-title">
                                Вибери послугу та запишись
                            </div>
                            <div layout="row" class=" program-block-master  ">
                                <div layout="column"
                                     ng-repeat="service in master.services track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master,service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>

                                </div>
                            </div>
                            <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button md-display-1 md-raised "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>
                            <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                       ng-click="::$ctrl.showAppointmentDialog(master)">
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


export class MastersComponentController {

    static $inject = ["$location", MasterResourceName, AppointmentServiceName, AppointmentResourceName,
        'smoothScroll', SeoPageResourceName, "$q", '$rootScope'];
    masters: IMaster[];
    markerReadySEO: string;
    seo: any;

    constructor(private $location: ng.ILocationService,
                private masterResource: IMasterResource, private AppointmentService: IAppointmentService,
                private AppointmentResource: IAppointmentResource, private smoothScroll,
                private SeoPageResource: ISeoPageResource, private $q, private $rootScope: IRootScope) {

    }

    $onInit() {
        this.seo = this.SeoPageResource.query({query: {"name": "masters"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        this.masters = this.masterResource.query({sort: {"order": 1}, populate: 'services.favor'})
        this.masters.$promise.then((masters) => {
            this.scrollToMain();
            this.masters.forEach((master)=> {
                this.seoMaster(master);

            })

        });

        this.$q.all([this.seo.$promise, this.masters.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }
    seoMaster(master) {
        master.seoJson=
        {
            "@context": "http://schema.org/",
            "@type": "Person",
            "jobTitle": master.subtitle,
            "url": "http://palamar.com.ua" + "/beauty-salon/master/" + master._id,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                "addressLocality": "Львів, Україна",
                "addressCountry": "Україна"
            },
            "name": master.name,
            "description": master.description,
            "image": "http://palamar.com.ua" + master.photo.url,
            "brand": {
                "@context": "http://schema.org/",
                "@type": "Brand",
                "url": "http:/palamar.com.ua/",
                "alternateName": "PALAMAR",
                "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
                "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
                "name": "PALAMAR GROUP"
            },
            "homeLocation":{
                "@type": "Place",
                "geo": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "49.8110769",
                        "longitude": "23.9737773"
                    },
                    "geoRadius": "50"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                    "addressLocality": "Львів, Україна",
                    "addressCountry": "Україна"
                }
            }
        };
    }


    showAppointmentDialog(master, service = null) {
        var appointment = new this.AppointmentResource();
        appointment.master = master;
        appointment.service = service;
        this.AppointmentService.onShowDialog(appointment);
    }

    scrollToMain() {
        var options = {
            duration: 1,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

}

export let MastersComponentUrl = "/beauty-salon/masters";
export let MastersComponentName = 'pgMasters';
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};