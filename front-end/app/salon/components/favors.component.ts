import { IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";
import {FavorAppointmentServiceName} from "../servises/favor.appointment.service";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";

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
      "@id": "http://palamar.com.ua/beauty-salon/services",
      "name": "Послуги",
      "image": "http://palamar.com.ua/content/images/services/hear.jpg"
    }
  }]
}
</script>
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">

    <div ng-repeat="category in  $ctrl.categories track by $index">

        <div layout="row" flex ng-if="category.favors.length>0">
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> {{::category.name}}</div>
                </div>

            </div>
        </div>

        <div layout="row" layout-align="center center" ng-if="category.favors.length>0 ">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="90">
                <div class="favor-app-btn" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" ng-repeat="favor in category.favors track by $index"
                             class="md-margin "
                             ng-attr-flex-gt-sm="46"
                             flex-gt-xs="46" flex-xs="80"
                    >
                        <sb-jsonld json="{{::favor.seoJson}}"></sb-jsonld>
                         <a ng-href="/beauty-salon/service/{{favor._id}}">
                        <img ng-src="{{::favor.photo.url}}" alt="{{::favor.name}} від PALAMAR GROUP Львів " >
                        <md-card-content  layout="column"
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
        <div layout="row" layout-align="center center" ng-if="$ctrl.videos.length>0">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85">
                <div layout="column" layout-margin layout-align="center center" class="embed-responsive-container">
                    <md-card md-whiteframe="6" class="  courses-videos"
                             ng-repeat="video in $ctrl.videos  track by $index" temprop="workPerformed" itemscope=""
                             itemtype="http://schema.org/CreativeWork"
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
                        <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                            <span itemprop="name" class="  md-margin">{{::video.name}}</span>
                        </md-card-content>
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
                        <img ng-src="{{::photo.url}}" class="md-card-image" itemprop="image" alt="{{::photo.name}}">
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


export class FavorsComponentController {

    static $inject = [FavorResourceName, MediaObserverFactoryName,
        '$rootScope','constants', "$routeParams", "$location",
        'orderByFilter','smoothScroll',SeoPageResourceName,"$q",FavorAppointmentServiceName,AppointmentResourceName];

    favors: any;
    masters: IMaster[];
    categories: any;
    markerReadySEO: string;
    photos: any;
    videos: any;
    socialParams:any;
    seo:any;

    constructor(private favorResource: IFavorResource, private mediaObserver: IMediaObserverFactory,
                private $rootScope: IRootScope,private constants: IConstants,
                private $routeParams: ng.route.IRouteParamsService,
                private $location: ng.ILocationService, private orderByFilter: ng.IFilterOrderBy,
                private smoothScroll,private SeoPageResource:ISeoPageResource, private $q,
                private FavorAppointmentService,private AppointmentResource: IAppointmentResource) {


    }

    $onInit() {
        this.seo = this.SeoPageResource.query({query: {"name": "services"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        this.favors = [];
        this.photos = [];
        this.videos = [];
        this.categories = angular.copy(this.constants.favorCategories);
        this.favors= this.favorResource.query({sort: "order"})
        this.favors.$promise.then((favors) => {
            this.favors = favors;
            if (this.favors.length > 0) {
                this.scrollToMain();
                this.categories.forEach((category)=> {
                    var catVideo = [];
                    var catPhoto = [];
                    category.favors = favors.filter((favor)=> {
                        if (category.name == favor.category.name) {
                            catPhoto = catPhoto.concat(this.loadPhoto(favor));
                            catVideo = catVideo.concat(this.loadVideo(favor));
                        }
                        this.initSeo(favor);
                        return category.name == favor.category.name;
                    });

                    catPhoto.splice(2, catPhoto.length - 3)
                    catVideo.splice(0, catVideo.length - 1)
                    this.photos = this.photos.concat(catPhoto);
                    this.videos = this.videos.concat(catVideo);

                })

            }

        });
        this.$q.all([this.favors.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }

    showFavorAppointmentDialog(favor) {
        var appointment = new this.AppointmentResource();
        appointment.masters = this.masters;
        appointment.favor = favor;
        this.FavorAppointmentService.onShowDialog(appointment);
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
    loadPhoto(favor) {
        var temp = []
        if (favor.photos && favor.photos.length > 0) {
            var ph = this.orderByFilter(favor.photos, "order");
            temp.push(ph[0])
        }
        return temp
    }

    loadVideo(favor) {
        var temp = []
        if (favor.videos && favor.videos.length > 0) {
            var vi = this.orderByFilter(favor.videos, "order");
            temp.push(vi[0])
        }
        return temp

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
        this.$rootScope.socialParams.target = this.constants.host + "/beauty-salon/services" ;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title =  "Послуги салону";
        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }

    showMediaObserver(items, index): void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }

    initSeo(favor:IFavor) {
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
                "image":"http://palamar.com.ua" + favor.photo.url,
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
                        "telephone":"+38 067 264 6216",
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
}

export let FavorsComponentUrl = "/beauty-salon/services";
export let FavorsComponentName = 'pgFavors';
export let FavorsComponentOptions = {
    template: template,
    controller: FavorsComponentController
};