import {
    IAcademyVideosResource, AcademyVideosResourceName,
    IAcademyVideos
} from "../../resources/academy.video.resource";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";
import {SalonResourceName} from "../../resources/salon.resource";

const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter md-padding" flex>
            <div class="fit-screen-wrap invers header">
                <div hide show-gt-xs='true' class="md-display-1"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
                <div hide show-xs="true" class="md-headline""> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
            </div>

        </div>
    </div>

 <div ng-repeat="group in $ctrl.videos">
 
   <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers ">
                <div class="md-display-1"> {{::group.name}}</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center" >
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin  layout-align="center center" class="embed-responsive-container" >
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
</div>



`;
;

export class AcademyVideoComponentController {

    static $inject = [AcademyVideosResourceName, 'smoothScroll',  SeoPageResourceName,'$q', '$rootScope'];

    videos: IAcademyVideos[];
    markerReadySEO: string;
    seo:any;
    constructor(private AcademyVideosResource: IAcademyVideosResource,private smoothScroll,private SeoPageResource:ISeoPageResource,private $q,
    private $rootScope) {

    }

    $onInit() {
        this.seo = this.SeoPageResource.query({query: {"name": "video"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        var mainPromise = this.AcademyVideosResource.query({sort: 'order'}).$promise;
        mainPromise.then((videos) => {
            this.scrollToMain();
            this.videos = videos;

        });
        this.$q.all([mainPromise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
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

export let AcademyVideoComponentUrl = "/academy/videos";
export let AcademyVideoComponentName = 'pgAcademyVideo';
export let AcademyVideoComponentOptions = {
    template: template,
    controller: AcademyVideoComponentController
};