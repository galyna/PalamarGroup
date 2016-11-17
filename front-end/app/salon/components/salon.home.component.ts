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


const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПОСЛУГИ</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="70">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="category in $ctrl.categories track by $index "
                         class="md-margin "
                         ng-attr-flex-gt-sm="{{$ctrl.getPictureFlex($index,$ctrl.categories.length)}}" flex-gt-xs="46"
                         flex-xs="80"
                         ng-click="::$ctrl.showFavors(category.url)">

                    <img ng-src="{{'/content/images/services/'+ category._id+'.jpg'}}" class="md-card-image">

                    <md-card-content  layout="column"  layout-align="center center">
                        <span class="  md-margin">{{::category.name}}</span>                       
                    </md-card-content>
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
                            <div class=" md-headline">{{ ::day.name}}</div>
                            <div class="md-subhead  ">{{::day.program}}</div>
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
                <div class="md-display-2"> МАЙСТРИ</div>
            </div>
           
        </div>
    </div>
    <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="70">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="master in $ctrl.masters track by $index"
                         class="md-margin box "
                           ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.master.works.length)}}"                       
                         flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMaster(master._id)">
                   
                    <img ng-src="{{::master.photo.url}}" class=" ">
                    <md-card-content layout="column" class="  show-description" layout-align="center center">
                        <span class="  md-margin">{{::master.name}}</span>
                         <div class=" md-margin show-description-content">{{::master.rate.text}}</div>
                         <div class=" md-margin  subtitle">{{::master.subtitle}}</div>
                    </md-card-content>

            </div>
        </div>

    </div>

    <div layout="row" flex ng-if="$ctrl.transforms.length>0 ">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap    header-super">
            <div show-xs hide-gt-xs='true' class="md-display-1"> ПЕРЕВТІЛЕННЯ</div>
                <div hide-xs class="md-display-2"> ПЕРЕВТІЛЕННЯ</div>
            </div>
            
            <div class="overlay-trans ">
            </div>
        </div>
    </div>
 
    <div ng-repeat="transform in $ctrl.transforms track by $index">
        <div layout="row" layout-align="center center" >
            <div flex-xs="90" flex-gt-md="60" flex-md="80" flex-gt-xs="70">
                <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" class="  courses-videos"
                             
                             ng-repeat="video in ::transform.videos track by $index"
                             flex>
                        <div flex class="embed-responsive embed-responsive-16by9">
                            <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                           video-id="::video.url"></youtube-video>
                        </div>
                        <md-card-content ng-if="video.name" layout="column" layout-align="center center">
                            <span class="  md-margin">{{::video.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>

        </div>

        <div layout="row" layout-align="center center" >
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="70">
                <div class="courses-hear-forms" layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6"  ng-repeat="photo in ::transform.photos track by $index"
                             class="md-margin "
                               ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.master.works.length)}}"
                       
                             flex-gt-xs="46" flex-xs="80"
                              ng-click="::$ctrl.showMediaObserver(transform.photos, $index)">
                        <img ng-src="{{::photo.url}}" class="md-card-image">
                        <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                            <span class="  md-margin">{{::photo.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>
    </div>
    <div ng-if="$ctrl.showMoreTransforms" layout="row" layout-align=" center center" layout-align-xs="  center">
        <md-button ng-click="::$ctrl.showTransforms()" class="comment-btn xs-selected md-raised ">Всі перевтіління
        </md-button>
    </div>
     <div layout="row" ng-if="$ctrl.videos.length>0 " flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  header-super">
             <div show-xs hide-gt-xs='true' class="md-display-1"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
                <div hide-xs class="md-display-2"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
                
            </div>
            <div class="overlay-days">
            </div>
        </div>
    </div>
    <div ng-repeat="group in $ctrl.videos">
 
    <div layout="row" layout-align="center center" >
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos" 
                         ng-repeat="video in ::group.videos track by $index"
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
   <div ng-if="$ctrl.showMoreVideos" layout="row" layout-align=" center center" layout-align-xs="  center">
        <md-button ng-click="::$ctrl.showVideos()" class="comment-btn xs-selected md-raised ">Всі відео
        </md-button>
    </div>
     <div layout="row" flex ng-if="$ctrl.brends.length>0 " class="md-padding">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap header-super">
                <div class="md-display-2"> БРЕНДИ</div>
            </div>
            <div class="overlay-comments">
            </div>
       
        </div>
    </div>
    
     <div layout="row" layout-align="center center">

        <div flex  flex-gt-md="60" flex-gt-lg="40" flex-md="80" flex-gt-xs="70">
            <div flex class="brends-container" layout-margin layout layout-wrap layout-align="center center">
             <a href="{{::bren.url}}"  class="md-margin brend " layout="row"  layout-align="center center"
              flex-gt-sm="{{::$ctrl.getPictureFlex($index,$ctrl.brends.length)}}"
                             flex-gt-xs="46" flex-xs="80" ng-repeat="bren in $ctrl.brends track by $index">
                                              
                    <img ng-src="{{::bren.photo.url}}"  
                         class=""/>    </a>               
            </div>
        </div>

    </div>
</div>



`;

export class SalonHomeComponentController {

    static $inject = [MasterResourceName, 'smoothScroll', "$location", 'constants',
        TransformResourceName, BrendResourceName, "$rootScope", MediaObserverFactoryName,
        '$q',FavorResourceName,AcademyVideosResourceName];

    favors: IFavor[];
    masters: IMaster[];
    brends: IBrend[];
    markerReadySEO: string;
    transforms: ITransform[];
    days = [
        {
            name: "ПОНЕДІЛОК",
            program: '10:00 - 19:00',
        },
        {
            name: "ВІВТОРОК",
            program: '10:00 - 19:00',
        }, {
            name: "СЕРЕДА",
            program: '10:00 - 19:00',
        }, {
            name: "ЧЕТВЕР",
            program: '10:00 - 19:00',
        }, {
            name: "П`ЯТНИЦЯ",
            program: '10:00 - 19:00',
        }, {
            name: "СУБОТА",
            program: 'зачинено',
        }, {
            name: "НЕДІЛЯ",
            program: 'зачинено',
        }];
    categories: any;
    showMoreTransforms: boolean;
    socialParams: any;
    videos: IAcademyVideos[];
    showMoreVideos:boolean;

    constructor(private masterResource: IMasterResource,
                private smoothScroll, private $location: ng.ILocationService,
                private constants: IConstants, private TransformResource: ITransformResource,
                private BrendResource: IBrendResource, private $rootScope: IRootScope,
                private mediaObserver: IMediaObserverFactory, private $q,private favorResource: IFavorResource,
                private AcademyVideosResource: IAcademyVideosResource) {
        this.categories = this.constants.favorCategories;
    }

    $onInit() {

        this.masters = this.masterResource.query({sort: "order"});
        this.brends = this.BrendResource.query({sort: "order"});
        this.transforms = this.TransformResource.query({sort: "order", page: 1, perPage: 3});

        this.transforms.$promise.then((transforms) => {
            this.showMoreTransforms = transforms.length > 2;
            transforms.splice(2, transforms.length -2);
        });


        var favorPromise= this.favorResource.query({sort: "order"}).$promise;
        this.initFavors(favorPromise);

        this.videos= this.AcademyVideosResource.query({sort: 'order', page: 1, perPage: 3});
        this.videos.$promise.then((videos) => {
            this.showMoreVideos = videos.length > 2;
            videos.splice(2, videos.length-2);
        });
        this.$q.all([this.masters.$promise, this.brends.$promise,this.transforms.$promise,favorPromise, this.videos.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });

    }

    initFavors(favorPromise) {
        favorPromise.then((favors) => {
            this.favors = favors;
            if (this.favors.length > 0) {

                this.categories.forEach((category)=> {
                    category.favors = favors.filter((favor)=> {
                        return category.name == favor.category.name;
                    });
                })
            }

        });

    }

    scrollToMain() {
        var options = {
            duration: 400,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    showTransforms() {
        this.$location.path(`/beauty-parlour/transforms`);
    }

    showVideos() {
        this.$location.path(`/academy/videos`);
    }

    showFavors(id: String) {
        this.$location.path(`/beauty-parlour/services/${id}`);
    }

    showMaster(masterId: String) {
        this.$location.path(`/beauty-parlour/master/${masterId}`);
    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = 'Перевтілення';
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

export let SalonHomeComponentUrl = "/beauty-parlour";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
