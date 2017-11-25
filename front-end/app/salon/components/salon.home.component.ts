import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {TransformResourceName, ITransformResource, ITransform} from "../../resources/transform.resource";
import {IBrendResource, IBrend, BrendResourceName} from "../../resources/brend.resource";
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";
import {
    IAcademyVideosResource, IAcademyVideos,
    AcademyVideosResourceName
} from "../../resources/academy.video.resource";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";


const template = `<script type="application/ld+json">
    {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": {
    "@id": "http://palamar.com.ua/",
    "name": "Головна"
    }
    }]
    }
</script>
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПОСЛУГИ</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-md="90" flex-gt-xs="100">
            <div class="home-category-btn" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" ng-repeat="category in $ctrl.categories track by $index "
                         class="md-margin "  
                         flex-gt-xs="22" flex-xs="80">
                   
                    <a hreflang="uk" ng-href="/beauty-salon/services/{{category.url}}">
                        <img ng-src="{{'/content/images/services/'+ category._id+'.jpg'}}"
                             alt="{{::category.name}} Львів від PALAMAR GROUP"/>
                        
                        <md-card-content layout="column" layout-align="center center"
                                         class=" md-padding  show-description-favor">
                            <div  class=" cat-name ">{{::category.name}}</div>
                            <div layout="column" layout-align="center center" class="hiden-favors"
                                 ng-repeat="favor in ::category.favors track by $index ">
                                <sb-jsonld json="{{::favor.seoJson}}"></sb-jsonld>
                                <div layout="column">{{::favor.name}}
                                </div>
                            </div>
                        </md-card-content>
                    </a>
                </md-card>
                <md-card md-whiteframe="6" class="md-margin" flex-gt-xs="22" flex-xs="80">
                    <a hreflang="uk" ng-href="/beauty-salon/transformations">
                        <img ng-src="/content/images/services/fashionchange.jpg"
                             alt="ЗМІНА ОБРАЗУ від PALAMAR GROUP"/>
                        
                        <md-card-content layout="column" layout-align="center center"
                                         class=" md-padding  show-description-favor">
                            <div  class=" cat-name ">ЗМІНА ОБРАЗУ</div>
                        </md-card-content>
                    </a>
                </md-card>
            </div>
     </div>
    </div>
  
    <div layout="row" flex>
        <div class="page-delimiter content-block" id="trigger-right" flex>
            <div class="fit-screen-wrap header-long " layout="column">
                <div flex="none" layout="row" class="md-padding program-block  " layout-align=" center center">
                    <div ng-repeat="day in ::$ctrl.days track by $index">
                        <div class="date-block md-margin " ng-class="{'date-block-disabled':day.program=='зачинено'}"
                             layout="column"
                             layout-align=" center center">
                            <div hide show-gt-sm='true' class=" md-headline">{{ ::day.name}}</div>
                            <div hide show-gt-sm='true' class="md-subhead">{{::day.program}}</div>
                            <div hide-gt-sm='true' class=" md-title">{{ ::day.short}}</div>
                            <div hide-gt-sm='true' class="md-caption">{{::day.program}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" overlay-description">
            </div>

        </div>
    </div>
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2">КОМАНДА</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-md="90" flex-gt-xs="80">
            <div class="home-master-btn" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" ng-repeat="master in $ctrl.masters track by $index"
                         class="md-margin box "
                         ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.master.length)}}"
                         flex-gt-xs="46" flex-xs="80"
                >
                    <sb-jsonld json="{{::master.seoJson}}"></sb-jsonld>

                    <a hreflang="uk" ng-href="/beauty-salon/master/{{master._id}}">
                        <img ng-src="{{::master.photo.url}}"
                             alt="{{::master.name}} {{::master.subtitle}} у PALAMAR GROUP Львів">
                        <md-card-content layout="column" class="  show-description" layout-align="center center">
                            <span class=" ">{{::master.name}}</span>
                            <div class="  show-description-content">{{::master.rate.text}}</div>
                            <div class="   subtitle">{{::master.subtitle}}</div>

                        </md-card-content>
                    </a>
                    <md-card-content layout="column" class="  card-appoint"
                                     layout-align="center center"
                                     ng-click="::$ctrl.showAppointmentDialog(master)">

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

    <div layout="row" flex ng-if="$ctrl.transforms.length>0 ">
        <div class="page-delimiter md-padding" flex>
            <div class="fit-screen-wrap    header-super">
                <div hide show-gt-xs='true' class="md-display-1"> ЗМІНА ОБРАЗУ</div>
                <div hide show-xs="true" class="md-headline"> ЗМІНА ОБРАЗУ</div>
            </div>

            <div class="overlay-trans ">
            </div>
        </div>
    </div>

    <div ng-repeat="transform in $ctrl.transforms track by $index">
        <div layout="row" layout-align="center center" ng-if="transform.videos.length>0">
            <div flex-xs="90" flex-gt-md="60" flex-md="80" flex-gt-xs="70">
                <div layout="column" layout-margin class="embed-responsive-container" layout-align="center center">
                    <md-card md-whiteframe="6" class="  courses-videos"
                             temprop="workPerformed" itemscope=""
                             itemtype="http://schema.org/CreativeWork"
                             ng-repeat="video in ::transform.videos track by $index"
                             flex>
                        <div itemprop="creator" itemscope itemtype="http://schema.org/BeautySalon">
                            <meta itemprop="name" content="PALAMAR GROUP"/>
                            <meta itemprop="image"
                                  content="http://palamar.com.ua/content/images/logo/palamar_logo.png"/>
                            <meta itemprop="address" content="Львів, Україна"/>
                            <meta itemprop="telephone" content="+38 067 264 6216"/>
                        </div>

                        <meta itemprop="image" content="http://img.youtube.com/vi/{{video.url}}/mqdefault.jpg"/>
                        <div flex class="embed-responsive embed-responsive-16by9" itemscope
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

        <div 
            class="transform-photos" 
            layout-xs="column"
            layout-gt-xs="row" 
            layout-align="center center"
        >
            <span flex></span>
            <pg-photocard
                        ng-repeat="photo in ::transform.photos | orderBy:'order' track by $index"
                        layout-margin
                        flex-sm="40"
                        flex-gt-sm="30"
                        url="photo.url"
                        name="photo.name"
                        description="photo.description"
                        ng-click="::$ctrl.showMediaObserver(transform.photos  | orderBy:'order' , $index)"
                    ></pg-photocard>
            <span flex></span>
        </div>
    </div>
    <div ng-if="$ctrl.showMoreTransforms" class="md-padding" layout="row" layout-align=" center center"
         layout-align-xs="  center">
        <a hreflang="uk" ng-href="/beauty-salon/transformations" class="md-button md-primary comment-btn xs-selected md-raised "
           layout="row" layout-align=" center center"><span>Показати більше</span>
        </a>

    </div>
    <div layout="row" flex>
        <div class="page-delimiter " flex>
            <div class="fit-screen-wrap md-padding header-super">
                <div hide show-gt-xs='true' class="md-display-1"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
                <div hide show-xs="true" class="md-headline"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
            </div>
            <div class="overlay-days">
            </div>
        </div>
    </div>
    <div layout="row" flex ng-if="$ctrl.brends.length>0 " class="md-padding">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap header-super">
                <div class="md-display-2">ПАРТНЕРИ</div>
            </div>
            <div class="overlay-comments">
            </div>

        </div>
    </div>

    <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-gt-lg="40" flex-md="80" flex-gt-xs="70">
            <div flex class="brends-container" layout-margin layout layout-wrap layout-align="center center">
                <a hreflang="uk" ng-href="{{::bren.url}}" class="md-margin brend " layout="row" layout-align="center center"
                   target="_blank"
                   flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.brends.length)}}"
                   flex-gt-xs="46" flex-xs="80" ng-repeat="bren in $ctrl.brends track by $index">
                    <sb-jsonld json="{{::bren.seoJson}}"></sb-jsonld>
                    <img ng-src="{{::bren.photo.url}}"
                         class=""/> </a>
            </div>
        </div>

    </div>
</div>



`;

export class SalonHomeComponentController {

    static $inject = [MasterResourceName, "$location", 'constants',
        TransformResourceName, BrendResourceName, "$rootScope", MediaObserverFactoryName,
        '$q', FavorResourceName, AcademyVideosResourceName, SeoPageResourceName, AppointmentServiceName, AppointmentResourceName];

    favors: IFavor[];
    masters: IMaster[];
    brends: IBrend[];
    markerReadySEO: string;
    transforms: ITransform[];
    days = [
        {
            name: "ПОНЕДІЛОК",
            short: "ПН",
            program: '09:00 - 21:00',
        },
        {
            name: "ВІВТОРОК",
            short: "ВТ",
            program: '09:00 - 21:00',
        }, {
            name: "СЕРЕДА",
            short: "СР",
            program: '09:00 - 21:00',
        }, {
            name: "ЧЕТВЕР",
            short: "ЧТ",
            program: '09:00 - 21:00',
        }, {
            name: "П`ЯТНИЦЯ",
            short: "ПТ",
            program: '09:00 - 21:00',
        }, {
            name: "СУБОТА",
            short: "СБ",
            program: '09:00 - 21:00',
        }, {
            name: "НЕДІЛЯ",
            short: "НД",
            program: '09:00 - 15:00',
        }];
    categories: any;
    showMoreTransforms: boolean;
    socialParams: any;
    videos: IAcademyVideos[];
    seo: any;


    constructor(private masterResource: IMasterResource,
                private $location: ng.ILocationService,
                private constants: IConstants, private TransformResource: ITransformResource,
                private BrendResource: IBrendResource, private $rootScope: IRootScope,
                private mediaObserver: IMediaObserverFactory, private $q, private favorResource: IFavorResource,
                private SeoPageResource: ISeoPageResource, private AppointmentService: IAppointmentService, private AppointmentResource: IAppointmentResource) {
        this.categories = this.constants.favorCategories;
    }

    $onInit() {

        this.seo = this.SeoPageResource.query({query: {"name": "home"}}).$promise.then((seo) => {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;

            }

        });
        this.masters = this.masterResource.query({sort: "order"})
        this.initMasters();

        this.brends = this.BrendResource.query({sort: "order"});
        this.brends.$promise.then((brends) => {
            this.brends.forEach((brend) => {
                this.seoBrend(brend);

            })
        })
        this.transforms = this.TransformResource.query({sort: "order", page: 1, perPage: 3});

        this.transforms.$promise.then((transforms) => {
            this.showMoreTransforms = transforms.length > 2;
            transforms.splice(2, transforms.length - 2);
        })


        var favorPromise = this.favorResource.query({sort: "order"}).$promise;
        this.initFavors(favorPromise);

        this.$q.all([this.masters.$promise, favorPromise,
            this.transforms.$promise, this.brends,
            this.seo.$promise
        ]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });

    }

    showAppointmentDialog(master) {
        var appointment = new this.AppointmentResource();
        appointment.master = master;
        this.AppointmentService.onShowDialog(appointment);

    }

    initMasters() {
        this.masters.$promise.then((masters) => {
            masters.forEach((master) => {
                this.seoMaster(master);
            })
        });
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
                    "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
                    "name": "PALAMAR GROUP"
                },
                "homeLocation": {
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

    initFavorSeo(favor: IFavor) {
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
                        "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
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
                    "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
                    "name": "PALAMAR GROUP"
                }
            }

    }

    seoBrend(brend) {
        brend.seoJson =
            {
                "@context": "http://schema.org/",
                "@type": "Brand",
                "url": brend.url,
                "logo": "http://palamar.com.ua" + brend.photo.url,
                "name": brend.name
            };
    }


    initFavors(favorPromise) {
        favorPromise.then((favors) => {
            this.favors = favors;
            if (this.favors.length > 0) {

                this.categories.forEach((category) => {
                    category.favors = favors.filter((favor) => {
                        this.initFavorSeo(favor);
                        return category._id== favor.category._id;
                    });
                })
            }

        });

    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = 'ЗМІНА ОБРАЗУ';
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
}

export let SalonHomeComponentUrl = "/beauty-salon";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
