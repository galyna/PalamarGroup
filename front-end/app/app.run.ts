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
    $rootScope.loading = false;
    
    $rootScope.isBigSize = $mdMedia( 'gt-lg' );
    if ($mdMedia( 'gt-md' )) {
        var videoTag = angular.element( ` <video  hide show-gt-md="true" class="screen" muted autoplay
                                              loop="true" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bd.mp4"/>
                                                           </video>` );
        var videoContainer = angular.element( document.querySelector( '#video-container' ) );
        videoContainer.append( videoTag );
    }
    //create a new instance
    AOS.init( {} );


    $rootScope.$on( '$routeChangeStart', function () {
        //show loading gif
        $timeout( ()=> {
            $rootScope.loading = true;
        }, 1 );
    } );

    $rootScope.$on( '$routeChangeSuccess', function () {
        //hide loading gif
        $timeout( ()=> {
            $rootScope.loading = false;
            AOS.refresh();

        }, 5 );


    } );

    $rootScope.$on( '$routeChangeError', function () {
        //hide loading gif
        $timeout( ()=> {
            $rootScope.loading = false;
        }, 1 );

    } );
}