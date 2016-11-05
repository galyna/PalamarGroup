import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {TransformResourceName, ITransformResource, ITransform} from "../../resources/transform.resource";
import {IBrendResource, IBrend, BrendResourceName} from "../../resources/brend.resource";
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";


const template = `<div class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПОСЛУГИ</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="category in $ctrl.categories track by $index "
                         class="md-margin "
                         ng-attr-flex-gt-sm="{{$ctrl.getPictureFlex($index,$ctrl.categories.length)}}" flex-gt-xs="46"
                         flex-xs="80"
                         ng-click="::$ctrl.showFavors(category._id)">

                    <img ng-src="{{'/content/images/services/'+ category._id+'.jpg'}}" class="md-card-image">

                    <md-card-content layout="column" layout-align="center center">
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
            <div class="overlay-days">
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

        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="master in $ctrl.masters track by $index"
                         class="md-margin box "
                         flex-gt-sm="46"
                         flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMaster(master._id)">
                    <div ng-if="master.rate && master.rate._id!=='0'"
                         class="corner-ribbon-min top-right black"
                         ng-class="{'grey': master.rate._id==='2','white': master.rate._id==='1'}">{{::master.rate.text}}
                    </div>
                    <img ng-src="{{::master.photo.url}}" class="md-card-image">
                    <md-card-content layout="column" layout-align="center center">
                        <span class="  md-margin">{{::master.name}}</span>
                    </md-card-content>

            </div>
        </div>

    </div>

    <div layout="row" flex ng-if="$ctrl.transforms.length>0 ">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-1"> ПЕРЕВТІЛЕННЯ</div>
            </div>
        </div>
    </div>
 
    <div ng-repeat="transform in $ctrl.transforms track by $index">
        <div layout="row" layout-align="center center" >
            <div flex-xs="90" flex-gt-md="60" flex-md="80" flex-gt-xs="85">
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
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
                <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6"  ng-repeat="photo in ::transform.photos track by $index"
                             class="md-margin "
                             flex-gt-sm="46"
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
    
     <div layout="row" flex ng-if="$ctrl.brends.length>0 ">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-1"> БРЕНДИ</div>
            </div>
        </div>
    </div>
    
     <div layout="row" layout-align="center center">

        <div flex  flex-gt-md="60" flex-gt-lg="40" flex-md="80" flex-gt-xs="60">
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
        TransformResourceName, BrendResourceName, "$rootScope", MediaObserverFactoryName];

    favors: IFavor[];
    masters: IMaster[];
    brends: IBrend[];
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
    socialParams:any;

    constructor(private masterResource: IMasterResource,
                private smoothScroll, private $location: ng.ILocationService,
                private constants: IConstants, private TransformResource: ITransformResource,
                private BrendResource: IBrendResource, private $rootScope:IRootScope,
                private mediaObserver:IMediaObserverFactory) {

        this.masters = this.masterResource.query({sort: "order"});
        this.brends = this.BrendResource.query({sort: "order"});
        this.transforms = this.TransformResource.query({sort: "order", pageSize: 2});
        this.transforms.$promise.then((transforms) => {
            this.showMoreTransforms = transforms.length > 2;
            transforms.splice(1, transforms.length - 2);
        });
        this.categories = this.constants.favorCategories;
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
        this.$location.path(`/transforms`);
    }

    showFavors(id: String) {
        this.$location.path(`/favors/${id}`);
    }



    showMaster(masterId: String) {
        this.$location.path(`/master/${masterId}`);
    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host ;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title = 'Перевтілення';
        this.socialParams = angular.copy( this.$rootScope.socialParams, this.socialParams );
    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }

    showMediaObserver(items, index):void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }
}

export let SalonHomeComponentUrl = "/home";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
