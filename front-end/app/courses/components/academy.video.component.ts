import {
    IAcademyVideosResource, AcademyVideosResourceName,
    IAcademyVideos
} from "../../resources/academy.video.resource";

const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
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
</div>



`;
;

export class AcademyVideoComponentController {

    static $inject = [AcademyVideosResourceName];

    videos: IAcademyVideos[];
    markerReadySEO: string;

    constructor(private AcademyVideosResource: IAcademyVideosResource) {

    }

    $onInit() {


        var mainPromise = this.AcademyVideosResource.query({sort: 'order'}).$promise;
        mainPromise.then((videos) => {
            this.videos = videos;
            this.markerReadySEO = "dynamic-content";
        });
    }

}

export let AcademyVideoComponentUrl = "/academy/videos";
export let AcademyVideoComponentName = 'pgAcademyVideo';
export let AcademyVideoComponentOptions = {
    template: template,
    controller: AcademyVideoComponentController
};