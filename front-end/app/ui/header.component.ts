const template = `<div class="container-wrapper description-container ">
    <div class="page-header">
  
     <div  ng-click="$ctrl.handleVideoRuning()" class="stop-video-container" layout="row" layout-align="center center " >
        <div ng-if="$ctrl.runVideo" class="stop-label">ЗУПИНТИ ВІДЕО</div>
        <div ng-if="!$ctrl.runVideo" class="stop-label">ЗAПУСПИТИ ВІДЕО</div>
    </div>
        <div class="fit-screen-wrap">
            <div class="page-header-wrap "  layout="row" layout-align="center center">
                <div id="logo-container" >
                    <a href="/beauty-parlour"  layout="row" layout-align="center center" >
                    <img class="logo-img md-padding"  src="../content/images/logo/palamar_logo.png"/>
                    <div class="md-padding" >
                        <h1 class="featured-area-title"> PALAMAR GROUP</h1>
                        <div  class="featured-area-subtitle">
                            beauty parlour & academy
                        </div>
                    </div>
                        <img class="logo-img md-padding"  src="../content/images/logo/palamar_logo.png"/>

                    </a>
                </div>
                <div id="video-container" >
<video  hide show-gt-md="true" class="screen" muted autoplay
                                              loop="$ctrl.runVideo" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bg1.mp4"/>
                                                           </video>
                </div>
            </div>
        </div>

        <div class="pic-wrapper" >
            <figure class="pic-1"></figure>
            <figure  class="pic-2"></figure>
            <figure  class="pic-3"></figure>
            <figure class="pic-4"></figure>
            <figure class="pic-5"></figure>


        </div>
        <md-button  easing="easeInOutCubic" scroll-to="mainContent"
                   duration="100" class=" md-fab  down-btn" aria-label="down">
            <md-icon class=""
                     md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>
        </md-button>
    </div>
</div>`;

export class SalonHeaderComponentController {


    static $inject = ['$mdMedia'];

    runVideo: boolean;
    isVideoLoaded: boolean;
    videoElement: any;


    constructor(private $mdMedia) {

    }

    $onInit() {
        if (this.$mdMedia('md')) {
            this.videoElement = angular.element(` <video  hide show-gt-md="true" class="screen" muted autoplay
                                              loop="true" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bg1.mp4"/>
                                                           </video>`);
            var videoContainer = angular.element(document.querySelector('#video-container '));
            videoContainer.append(this.videoElement);
            this.runVideo = true;
            this.isVideoLoaded = true;
        }
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