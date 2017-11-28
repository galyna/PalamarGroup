import {ITransform, ITransformResource, TransformResourceName} from "../../resources/transform.resource";
import {IRootScope} from "../../../typings";
import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";


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
      "@id": "http://palamar.com.ua/beauty-salon/transformations",
      "name": "ЗМІНА ОБРАЗУ"   
    }
  }]
}
</script>
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter md-padding" flex>
            <div class="fit-screen-wrap invers header">
                <div hide show-gt-xs='true' class="md-display-1"> ЗМІНА ОБРАЗУ</div>
                <div hide show-xs="true" class="md-headline"> ЗМІНА ОБРАЗУ</div>
            </div>

        </div>
    </div>

    <div ng-repeat="transform in $ctrl.transforms">
        <div layout="row" layout-align="center center" ng-if="transform.videos.length>0">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85">
                <div layout="column" layout-margin class="embed-responsive-container" layout-align="center center">
                    <md-card md-whiteframe="6" class="  courses-videos" temprop="workPerformed" itemscope=""
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
</div>
`;

export class SalonTransformsComponentController {


    static $inject = [TransformResourceName, "$rootScope", MediaObserverFactoryName, 'constants', 'smoothScroll',
        SeoPageResourceName, '$q'];

    showAnimation: boolean;
    transforms: ITransform[];
    socialParams: any;
    markerReadySEO: string;
    seo: any;

    constructor(private TransformResource: ITransformResource, private $rootScope: IRootScope,
                private mediaObserver: IMediaObserverFactory,
                private constants: IConstants, private smoothScroll, private SeoPageResource: ISeoPageResource, private  $q) {

    }

    $onInit() {
        this.transforms = this.TransformResource.query({sort: "order"});
        this.transforms.$promise.then((transforms)=> {
            this.scrollToMain();
        });

        this.seo = this.SeoPageResource.query({query: {"name": "transforms"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });

        this.$q.all([this.transforms.$promise, this.seo]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
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

    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + SalonTransformsComponentUrl;
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

export let SalonTransformsComponentUrl = "/beauty-salon/transformations";
export let SalonTransformsComponentName = 'pgSalonTransforms';
export let SalonTransformsComponentOptions = {
    template: template,
    controller: SalonTransformsComponentController
};
