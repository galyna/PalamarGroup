import {IRootScope} from "../typings";
import AOS from "aos";

appRun.$inject = ['$rootScope', '$timeout', '$mdMedia'];
export function appRun($rootScope:IRootScope, $timeout, $mdMedia) {
    $rootScope.socialParams = {
        host: "",
        target: "",
        title: "",
        image: "",
        description: ""
    };

    $rootScope.isBigSize = $mdMedia( 'gt-md' );
    if ($rootScope.isBigSize) {
        var videoTag = angular.element( ` <video  hide show-gt-md="true" class="screen" muted autoplay
                                              loop="true" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bd.mp4"/>
                                                           </video>` );
        var videoContainer = angular.element( document.querySelector( '#video-container' ) );
        videoContainer.append( videoTag );
    }
    //create a new instance
    AOS.init( {
        disable: 'mobile'
    } );

    $rootScope.$on( '$routeChangeSuccess', function () {
        $timeout( ()=> {
            AOS.refresh();
        }, 10 );

    } );
}