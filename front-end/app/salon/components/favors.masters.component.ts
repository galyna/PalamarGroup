import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";
import {FavorAppointmentServiceName} from "../servises/favor.appointment.service";

const template = `
<sb-jsonld json="{{$ctrl.breadcrumbList}}"></sb-jsonld>

<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">

    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> {{::$ctrl.category.name}}</div>
            </div>

        </div>
    </div>

    <div layout="row" layout-align="center center">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="90">
            <div class="favor-app-btn" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" ng-repeat="favor in $ctrl.favors track by $index"
                         class="md-margin "
                         ng-attr-flex-gt-sm="46"
                         flex-gt-xs="46" flex-xs="80"
                >
                    <sb-jsonld json="{{::favor.seoJson}}"></sb-jsonld>
                    <a hreflang="uk" ng-href="/beauty-salon/service/{{favor._id}}">
                        <img ng-src="{{::favor.photo.url}}" alt="{{::favor.name}} від PALAMAR GROUP Львів " >
                        <sb-jsonld json="{{::favor.seoJson}}"></sb-jsonld>
                        <md-card-content layout="column"
                                         class="  show-description-favor" layout-align="center center">
                            <span class="  md-margin">{{::favor.name}}</span>
                            <div class=" md-margin show-description-content">{{::favor.description}}</div>
                        </md-card-content>
                    </a>
                    <md-card-content layout="column" class="  card-appoint" layout-align="center center"
                                     ng-click="::$ctrl.showFavorAppointmentDialog(favor)">
                        <md-button hide-gt-xs="true"
                                   class=" md-margin  xs-selected md-display-1 md-raised "
                                   aria-label="Details">
                            Записатись
                        </md-button>

                        <div hide show-gt-xs='true'>
                            Записатись
                        </div>

                    </md-card-content>
                </md-card>
            </div>
        </div>
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

<div ng-if="$ctrl.masters.length>0" class="courses description-container" layout="row" layout-align="center center">

    <div layout="column" layout-align="center center">

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>
            <sb-jsonld json="{{::master.seoJson}}"></sb-jsonld>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media "
                             flex="50">
                            <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
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
                     <a ng-href="/beauty-salon/master/{{master._id}}">
                        <div ng-if="master.rate && master.rate._id!=='0'" class="card-desc-top-master white"
                             flex
                             layout="column"
                             layout-align=" space-around center">
                            <md-card-title>
                                <md-card-title-text flex layout="column" layout-align=" space-around center">
                                    <div class="md-headline"> {{::master.rate.text}}</div>
                                </md-card-title-text>
                            </md-card-title>
                        </div>
                       
                            <div class="card-media "><img alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів"
                                    ng-src="{{master.photo.url}}" 
                                    class="md-card-image"/></div>
                        </a>
                        <div class="card-desc "
                             layout="column" layout-align="center center">
                              <a ng-href="/beauty-salon/master/{{master._id}}">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline capitalize">{{::master.name}}</div>

                                </md-card-title-text>
                            </md-card-title>
                            </a>
                            <div class="md-title">
                                Вибери послугу та запишись
                            </div>
                            <div layout="row" class=" program-block-master  ">
                                <div layout="column"
                                     ng-repeat="service in ::master.services track by $index"
                                     layout-align=" start center">

                                    <div class="date-block md-margin "
                                         ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                         ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                         layout="column"
                                         layout-align=" center center">
                                    </div>

                                </div>
                            </div>
                            <a ng-href="/beauty-salon/master/{{master._id}}"
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

<div class="courses-details description-container" layout="column">
    <div layout="row" ng-if="$ctrl.videos.length>0 || $ctrl.photos.length>0" flex>
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
                <div layout="column" layout-margin class="embed-responsive-container" ng-if="$ctrl.videos.length>0"
                     layout-align="center center">
                    <md-card md-whiteframe="6" class="  courses-videos" temprop="workPerformed" itemscope=""
                             itemtype="http://schema.org/CreativeWork"
                             ng-repeat="video in $ctrl.videos  track by $index"
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
                    <md-card md-whiteframe="6" ng-repeat="photo in $ctrl.photos  track by $index"
                             temprop="workPerformed" itemscope="" itemtype="http://schema.org/CreativeWork"
                             class="md-margin "
                             ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.photos.length)}}" flex-gt-xs="46"
                             flex-xs="80"
                             ng-click="::$ctrl.showMediaObserver($ctrl.photos, $index)">
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


export class FavorsMastersComponentController {


    static $inject = [FavorResourceName, 'constants', "$routeParams", "$location", MasterResourceName,
        AppointmentServiceName, AppointmentResourceName, '$q', 'orderByFilter', MediaObserverFactoryName,
        '$rootScope', 'smoothScroll', SeoPageResourceName, FavorAppointmentServiceName];

    favors: any;
    masters: IMaster[];
    category: any;
    markerReadySEO: string;
    photos: any;
    videos: any;
    socialParams: any;
    seo: any;
    breadcrumbList: any;

    constructor(private favorResource: IFavorResource, private constants: IConstants,
                private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService,
                private MasterResource: IMasterResource, private AppointmentService: IAppointmentService,
                private AppointmentResource: IAppointmentResource, private $q, private orderByFilter: ng.IFilterOrderBy,
                private mediaObserver: IMediaObserverFactory,
                private $rootScope: IRootScope, private smoothScroll,
                private SeoPageResource: ISeoPageResource, private FavorAppointmentService) {


    }

    $onInit() {

        this.favors = [];
        var categories = angular.copy(this.constants.favorCategories);
        this.photos = [];
        this.videos = [];
        if (this.$routeParams["category"]) {
            this.seo = this.SeoPageResource.query({query: {"name": this.$routeParams["category"]}}).$promise.then((seo) => {
                if (seo.length > 0) {
                    this.$rootScope.seo = seo[0];
                    document.title = this.$rootScope.seo.title;
                }

            });
            this.category = categories.filter((cat) => {
                return cat.url == this.$routeParams["category"]
            })[0];
            this.initBreadcrumbList();

            var favorsPromise = this.favorResource.query({
                sort: "order",
                query: {"category._id": this.category._id}
            }).$promise;

            this.setFavors(favorsPromise);
            var masterPromise = this.MasterResource.query({populate: 'services.favor', sort: "order"}).$promise;
            this.setMasters(masterPromise, this.category._id);

            this.$q.all([masterPromise, favorsPromise, this.seo.$promise]).then((tt) => {
                this.markerReadySEO = "dynamic-content";
            });
        }

    }

    showFavorAppointmentDialog(favor) {
        var appointment = new this.AppointmentResource();
        appointment.masters = this.masters;
        appointment.favor = favor;
        this.FavorAppointmentService.onShowDialog(appointment);
    }


    setFavors(favorsPromise) {
        favorsPromise.then((favors) => {
            this.favors = favors;
            this.scrollToMain();
            this.favors.forEach((fav) => {
                if (fav.photos && fav.photos.length > 0) {
                    this.photos = this.photos.concat(fav.photos);
                }
                if (fav.videos && fav.videos.length > 0) {
                    this.videos = this.videos.concat(fav.videos);
                }
                this.initSeo(fav);

            })
            this.photos = this.orderByFilter(this.photos, "order");
            this.videos = this.orderByFilter(this.videos, "order");
            this.photos.splice(9, this.photos.length - 10)
            this.videos.splice(2, this.videos.length - 3)
        });
    }

    setMasters(masterPromise, categoryId) {
        masterPromise.then((masters) => {
            this.masters = masters.filter((master) => {
                master.services = master.services.filter((s) => {
                    return s.favor.category._id == categoryId;
                });
                if (master.services.length > 0) {
                    this.seoMaster(master);
                }
                return master.services.length > 0;
            })
        });
    }

    seoMaster(master) {
        master.seoJson =
            {"@context": "http://schema.org/",
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


    getPictureFlex(index, length) {
        if (length < 3 || (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 ))) {
            return 46;
        } else {
            return 22;
        }
    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/beauty-salon/services/" + this.category.url;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = this.category.name;
        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }

    showMediaObserver(items, index): void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }

    initSeo(favor: IFavor) {
        favor.seoJson =
            {
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
            }

    }

    initBreadcrumbList() {
        this.breadcrumbList = {
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
                    "@id": "http://palamar.com.ua/beauty-salon/services/" + this.category.url,
                    "name": this.category.name
                }
            }]
        }
    }
}

export let FavorsMastersComponentUrl = "/beauty-salon/services/:category";
export let FavorsMastersComponentName = 'pgFavorsMasters';
export let FavorsMastersComponentOptions = {
    template: template,
    controller: FavorsMastersComponentController
};