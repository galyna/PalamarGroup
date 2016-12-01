import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";
import {IRootScope} from "../../../typings";
import {FavorAppointmentServiceName} from "../servises/favor.appointment.service";

const template = `

<sb-jsonld json="{{::$ctrl.seoJson}}"></sb-jsonld>
<div class="courses description-container" ng-attr-id="{{ $ctrl.markerReadySEO }}">


    <div class="course-bg " layout-align="center center" flex layout="column">
        <div hide show-gt-xs="true" layout="row" layout-align="center center">

            <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
            >
                <md-card-content layout="row" layout-align="start none">

                    <div class="card-desc "
                         flex="50" layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text flex layout-align="space-around center">
                                <div hide show-md="true" class="md-display-2 capitalize">{{::$ctrl.favor.name}}
                                </div>
                                <div hide-md="true" class="md-display-1">{{::$ctrl.favor.name}}</div>
                                <div class="favor-container ">
                                    <div class="md-title">{{::$ctrl.favor.description}}</div>

                                </div>
                            </md-card-title-text>
                        </md-card-title>
                        <div flex="20" show-sm="true"
                             layout="row" layout-align="center center">
                            <md-button class=" md-margin near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       ng-click="::$ctrl.showFavorAppointmentDialog()">
                                Записатись
                            </md-button>
                        </div>
                    
                    </div>
                    <div class="card-media "
                         flex="50">
                         <img ng-src="{{::$ctrl.favor.photo.url}}" alt="{{::$ctrl.favor.name}} від PALAMAR GROUP Львів "
                          class="md-card-image "/>
                    </div>
                </md-card-content>
            </md-card>

        </div>

        <div hide-gt-xs="true" layout="row" layout-align="center center">

            <md-card md-whiteframe="8" ng-click="::$ctrl.showFavorAppointmentDialog()">
                <md-card-content layout="column">
                    <div class="card-media "><img ng-src="{{::$ctrl.favor.photo.url}}" class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="space-around center">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline capitalize md-margin">{{::$ctrl.favor.name}}</div>
                                <div class="md-title">{{::$ctrl.favor.description}}</div>
                            </md-card-title-text>
                        </md-card-title>
                          <md-button class=" md-margin near-master xs-selected md-display-1 md-raised "
                                       aria-label="Details"
                                       >
                                Записатись
                            </md-button>
                        
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>

    <div layout="row" ng-if="$ctrl.masters.length>0" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  header-super">
                <div flex class="md-display-2"> Майстри</div>
            </div>
            <div class="overlay-masters">
            
            </div>
        </div>
    </div>

    <div class="course-bg " layout="column" flex
         ng-repeat="master in $ctrl.masters | orderBy:['-level._id','order'] track by $index"
         layout-align="center center">
         <sb-jsonld json="{{::master.seoJson}}"></sb-jsonld>
          <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media "
                             flex="50">
                            <a ng-href="/beauty-salon/master/{{master._id}}">
                                <img ng-src="{{master.photo.url}}" alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                     class="md-card-image clickable-element "/>
                            </a>
                        </div>
                        <div class="card-desc box "
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 class="corner-ribbon top-right white"
                            >
                                {{::master.rate.text}}
                            </div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 class="corner-ribbon-min top-right white"
                            >
                                {{::master.rate.text}}
                            </div>
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
                                     ng-repeat="service in ::master.services.slice(0,12) track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>
                                    <div class="  md-title date-text capitalize">
                                        {{ ::service.favor.name}}
                                    </div>
                                </div>
                            </div>
                            <a hide show-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button md-display-1 md-raised "
                               layout="row" layout-align=" center center"><span> Про майстра</span>
                            </a>

                            <a hide show-gt-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
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

            <md-card md-whiteframe="8">
                <md-card-content layout="column">
                 <a ng-href="/beauty-salon/master/{{master._id}}">
                    <div ng-if="master.level" class="card-desc-top-master"
                         ng-class="{'grey': master.level._id==='1','white': master.level._id==='0'}" flex
                         layout="column"
                         layout-align=" space-around center">
                        <md-card-title>
                            <md-card-title-text flex layout="column" layout-align=" space-around center">
                                <div class="md-headline capitalize">{{::master.level.text}}</div>
                            </md-card-title-text>
                        </md-card-title>
                    </div>
                   
                    <div class="card-media "><img ng-src="{{master.photo.url}}" class="md-card-image"
                        alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"                        /></div>
                                                    </a>
                    <div class="card-desc "
                         layout="column" layout-align="center center">
                         <a ng-href="/beauty-salon/master/{{master._id}}">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline capitalize md-padding">{{::master.name}}</div>
                                <div class="md-title">{{::master.description}}</div>
                            </md-card-title-text>
                        </md-card-title>
                       </a>
                         <a hide show-gt-sm="true" ng-href="/beauty-salon/master/{{master._id}}"
                               class="md-button  md-display-1 md-raised  "
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

<div class="courses-details description-container" layout="column">
    <div layout="row" ng-if="$ctrl.favor.videos.length>0 || $ctrl.favor.photos.length>0" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  header-super">
                <div flex class="md-display-2"> Роботи та навчання</div>
            </div>
            <div class="overlay-days">
          
            </div>
        </div>
    </div>

    <div>
        <div layout="row" layout-align="center center">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85">
                <div layout="column" layout-margin layout-align="center center" class="embed-responsive-container"
                     ng-if="$ctrl.favor.videos.length>0">
                    <md-card md-whiteframe="6" class="  courses-videos" temprop="workPerformed" itemscope=""
                             itemtype="http://schema.org/CreativeWork"
                             ng-repeat="video in $ctrl.favor.videos | orderBy:'order' track by $index"
                             flex>
                            
                        <div itemprop="creator" itemscope itemtype="http://schema.org/BeautySalon">
                            <meta itemprop="name" content="PALAMAR GROUP"/>
                            <meta itemprop="image"
                                  content="http://palamar.com.ua/content/images/logo/palamar_logo.png"/>
                            <meta itemprop="address" content="Львів, Україна"/>
                            <meta itemprop="telephone" content="+38 067 264 6216"/>
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
                       
                    </md-card>
                </div>
            </div>

        </div>

        <div layout="row" layout-align="center center">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
                <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" ng-repeat="photo in $ctrl.favor.photos | orderBy:'order' track by $index"
                             temprop="workPerformed" itemscope=""
                             itemtype="http://schema.org/CreativeWork"
                             class="md-margin "
                             ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.favor.photos.length)}}"
                             flex-gt-xs="46" flex-xs="80"
                             ng-click="::$ctrl.showMediaObserver($ctrl.favor.photos | orderBy:'order', $index)">
                       <div itemprop="creator" itemscope itemtype="http://schema.org/BeautySalon">
                            <meta itemprop="name" content="PALAMAR GROUP"/>
                            <meta itemprop="image"
                                  content="http://palamar.com.ua/content/images/logo/palamar_logo.png"/>
                            <meta itemprop="address" content="Львів, Україна"/>
                        <meta itemprop="telephone" content="+38 067 264 6216"/>
                        </div>
                        <meta itemprop="image" content="http://palamar.com.ua{{::photo.url}}"/>
                        <img ng-src="{{::photo.url}}" class="md-card-image"  alt="{{::photo.name}}">
                        <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                            <span itemprop="name" class="  md-margin">{{::photo.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>

            </div>

        </div>
    </div>
</div>


 
`;

export class FavorComponentController {

    static $inject = ["$routeParams", "$location",
        FavorResourceName, MasterResourceName,
        AppointmentResourceName, AppointmentServiceName, MediaObserverFactoryName,
        'constants', '$rootScope', 'smoothScroll', '$q', FavorAppointmentServiceName];

    favor: IFavor;
    masters: IMaster[];
    socialParams: any;
    markerReadySEO: string;
    seoJson: any;


    constructor(private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService,
                private favorResource: IFavorResource, private masterResource: IMasterResource,
                private AppointmentResource: IAppointmentResource,
                private AppointmentService: IAppointmentService, private mediaObserver: IMediaObserverFactory,
                private constants: IConstants,
                private $rootScope: IRootScope, private smoothScroll,
                private  $q, private FavorAppointmentService) {

    }

    $onInit() {
        if (this.$routeParams["id"]) {

            this.favor = this.favorResource.get({id: this.$routeParams["id"]})
            this.favor.$promise
                .then((favor) => {
                    this.favor = favor;
                    document.title = favor.name + " " + "Львів";
                    this.$rootScope.seo.description = favor.description;
                    this.initSeo(favor);
                    this.scrollToMain();
                }).catch((err) => {
                this.$location.path(`/beauty-salon/services`);
            }).finally(() => {
                this.markerReadySEO = "dynamic-content";
            });


            this.masters = this.masterResource.query({
                populate: 'services.favor'
            })
            this.masters.$promise
                .then((masters) => {
                    this.masters = masters.filter((master) => {
                        return master.services.some((s) => {
                            if (s.favor._id == this.$routeParams["id"]) {
                                master.level = s.level;
                                this.seoMaster(master);
                                return true;
                            } else {
                                return false;
                            }

                        });
                    })
                });

            this.$q.all([this.favor.$promise, this.masters.$promise]).then((result) => {
                // $timeout(function() {  }, 100);
                this.markerReadySEO = "dynamic-content";
            });
        }
    }

    showFavorAppointmentDialog() {
        var appointment = new this.AppointmentResource();
        appointment.masters = this.masters;
        appointment.favor = this.favor;
        this.FavorAppointmentService.onShowDialog(appointment);
    }



    seoMaster(master) {
        master.seoJson =
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
                    "description": "Салон краси у Львуві. Послуги: стрижки, зачіски,фарбування, манікюр, візаж, мейкап, педікюр. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, манікюру, візажу, педікюру",
                    "name": "PALAMAR GROUP"
                }
            };
    }

    initSeo(favor: IFavor) {
        this.seoJson =
            [{
                "@context": "http://schema.org/",
                "@type": "Service",
                "areaServed": {
                    "@type": "Place",
                    "geo": {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": "49.8110769",
                            "longitude": "23.9737773"
                        },
                        "geoRadius": "50",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                            "addressLocality": "Львів, Україна",
                            "addressCountry": "Україна"
                        }
                    },
                    "map": "https://www.google.ru/maps/place/%D0%A1%D1%82%D1%83%D0%B4%D1%96%D1%8F+%D0%BA%D1%80%D0%B0%D1%81%D0%B8+%D0%AE%D0%BB%D1%96%D1%97+%D0%9F%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%80/@49.8110803,23.9715886,17z/data=!3m1!4b1!4m5!3m4!1s0x473ae70c7a4a754b:0x96d5b6a9de35eaa0!8m2!3d49.8110769!4d23.9737773"
                },
                "image": "http://palamar.com.ua" + favor.photo.url,
                "category": favor.category.name,
                "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                "serviceType": "сфера послуг",
                "description": favor.description,
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "UAH",
                    "price": favor.defPrice,
                    "seller": {
                        "@type": "BeautySalon",
                        "name": "PALAMAR GROUP",
                        "url": "http:/palamar.com.ua/",
                        "alternateName": "PALAMAR",
                        "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                        "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
                        "description": "Салон краси у Львуві. Послуги: стрижки, зачіски,фарбування, манікюр, візаж, мейкап, педікюр. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, манікюру, візажу, педікюру",
                        "sameAs": [
                            "https://www.facebook.com/hashtag/palamar_group",
                            "https://www.instagram.com/palamar_group/",
                            "https://vk.com/id202584528"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                            "addressLocality": "Львів, Україна",
                            "addressCountry": "Україна"
                        },
                        "telephone": "+38 067 264 6216",
                        "priceRange": "від 300 грн",
                    }
                },
                "name": favor.name,
                "brand": {
                    "@context": "http://schema.org/",
                    "@type": "Brand",
                    "url": "http:/palamar.com.ua/",
                    "alternateName": "PALAMAR",
                    "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                    "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
                    "description": "Салон краси у Львуві. Послуги: стрижки, зачіски,фарбування, манікюр, візаж, мейкап, педікюр. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, манікюру, візажу, педікюру",
                    "name": "PALAMAR GROUP"
                }
            }, {
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
                }, {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": "http://palamar.com.ua/beauty-salon/services",
                        "name": "Послуги",
                        "image": "http://palamar.com.ua/content/images/services/hear.jpg"
                    }
                }, {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@id": "http://palamar.com.ua/beauty-salon/service/" + favor._id,
                        "name": favor.name,
                        "image": "http://palamar.com.ua" + favor.photo.url
                    }
                }]
            }]

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


    showAppointmentDialog(master) {
        var appointment = new this.AppointmentResource();
        appointment.master = master;

        var matched = master.services.find((s) => {
            return s.favor._id == this.favor._id
        })
        if (matched) {
            appointment.service = matched;
        }

        this.AppointmentService.onShowDialog(appointment);

    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }


    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/beauty-salon/service/" + this.favor._id;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = this.favor.name;
        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }

    showMediaObserver(items, index): void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }

}

export let FavorComponentUrl = "/beauty-salon/service/:id";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};