import {ConsultServiceName} from "../salon/servises/consult.service";
const template = `<div ng-click="$ctrl.handleVideoRuning()" class="stop-video-container"
     layout="row"
     layout-align="center center ">
    <div ng-if="$ctrl.runVideo" class="stop-label">ЗУПИНТИ ВІДЕО</div>
    <div ng-if="!$ctrl.runVideo" class="stop-label">ЗAПУСПИТИ ВІДЕО</div>
</div>
<div class="pic-wrapper">
    <figure  class="pic-1"></figure>
</div>
<div id="video-container">
</div>
<div class="page-header-wrap " layout="row" layout-align="center center">
    <a href="/beauty-salon" layout="column" layout-align="center center" >
        <img  class="logo-img" src="../content/images/logo/palamar_logo.png"/>
        <div class="mp-padding md-margin">
            <h1  lang="en" class="featured-area-title"> PALAMAR GROUP</h1>

            <h2  lang="en" class="featured-area-subtitle">
                beauty parlour & academy
            </h2>
        </div>

    </a>
</div>

<md-button easing="easeInOutCubic" scroll-to="mainContent"
           duration="100" class=" md-fab  down-btn" aria-label="down">
    <md-icon class=""
             md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>
</md-button>`;

export class SalonHeaderComponentController {


    static $inject = ['$mdMedia', '$window',ConsultServiceName];

    runVideo: boolean;
    isVideoLoaded: boolean;
    videoElement: any;


    constructor(private $mdMedia, private  $window,private ConsultService) {

    }

    $onInit() {
        angular.element(this.$window).on('resize', ()=> this.onResize());

        if (this.$mdMedia('(min-width: 1360px)')) {
            this.loadVideo();
        }
    }

    $onDestroy() {
        angular.element(this.$window).off('resize', this.onResize);
    }

    consult() {
        this.ConsultService.onShowDialog();
    }


    onResize() {
        if (!this.isVideoLoaded && this.$mdMedia('(min-width: 1360px)')) {
            this.loadVideo();
        }

    }

    loadVideo() {
        this.videoElement = angular.element(` <video id="bigVi" class="screen" muted autoplay
                                              loop="true" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bg1.mp4"/>
                                                           </video>`);
        var videoContainer = angular.element(document.querySelector('#video-container'));
        videoContainer.append(this.videoElement);
        this.runVideo = true;
        this.isVideoLoaded = true;

    }

    handleVideoRuning() {
        this.runVideo = !this.runVideo;
        if (!this.runVideo) {
            this.videoElement[0].pause();
        } else {
            this.videoElement[0].play()
        }

    }


}


export let SalonHeaderComponentName = 'pgHeader';
export let SalonHeaderComponentOptions = {
    template: template,
    controller: SalonHeaderComponentController
};