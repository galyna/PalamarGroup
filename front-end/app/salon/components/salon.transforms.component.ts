import {ITransform, ITransformResource, TransformResourceName} from "../../resources/transform.resource";
import {IRootScope} from "../../../typings";
import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";


const template = `<div class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПЕРЕВТІЛЕННЯ</div>
            </div>

        </div>
    </div>

 <div ng-repeat="transform in $ctrl.transforms">
    <div layout="row" layout-align="center center" ng-if="transform.videos.length>0">
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos" data-aos="{{{true:'zoom-in-up', false:''}[$ctrl.showAnimation]}}"
                         ng-repeat="video in transform.videos track by $index"
                         flex>
                    <div flex class="embed-responsive embed-responsive-16by9">
                        <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                       video-id="video.url"></youtube-video>
                    </div>
                    <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::video.name}}</span>
                    </md-card-content>
                </md-card>
            </div>
        </div>

    </div>

     <div layout="row" layout-align="center center" ng-if="transform.photos.length>0">
        <div  flex flex-gt-md="60" flex-md="80"  flex-gt-xs="60">
         <div  class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="photo in transform.photos"
                         class="md-margin " ng-attr-flex-gt-sm="{{$ctrl.getPictureFlex($index,transform.photos.length)}}"  flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMediaObserver(transform.photos, $index)">                  
                        <img ng-src="{{::photo.url}}" class="md-card-image">
                    <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::photo.name}}</span>
                    </md-card-content>

            </div>
            
        </div>
         
    </div>
 </div>   
</div>



`;

export class SalonTransformsComponentController {


    static $inject = [TransformResourceName, "$rootScope", MediaObserverFactoryName,'constants'
    ];

    showAnimation:boolean;
    transforms:ITransform[];
    socialParams:any;

    constructor(private TransformResource:ITransformResource, private $rootScope:IRootScope,
                private mediaObserver:IMediaObserverFactory,
                private constants:IConstants) {
        this.showAnimation = $rootScope.isBigSize;
    }

    $onInit() {
        this.transforms = this.TransformResource.query({sort: "order"});


    }

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/#"+SalonTransformsComponentUrl;
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

export let SalonTransformsComponentUrl = "/transforms";
export let SalonTransformsComponentName = 'pgSalonTransforms';
export let SalonTransformsComponentOptions = {
    template: template,
    controller: SalonTransformsComponentController
};