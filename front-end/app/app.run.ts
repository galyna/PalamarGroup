///<reference path="../../typings/browser.extensions.d.ts"/>
import {IRootScope} from "../typings";


appRun.$inject = ['$rootScope', '$timeout', '$mdMedia'];
export function appRun($rootScope:IRootScope, $timeout, $mdMedia) {
   // FastClick.attach(document.body);
    $rootScope.socialParams = {
        host: "",
        target: "",
        title: "",
        image: "",
        description: ""
    };
    $rootScope.loading = false;
    
    $rootScope.isBigSize = $mdMedia( 'gt-lg' );
    if ($mdMedia( 'gt-md' ) ) {
        var videoTag = angular.element( ` <video  hide show-gt-md="true" class="screen" muted autoplay
                                              loop="true" onloadedmetadata="this.muted = true" >
                                           <source type="video/mp4" src="../content/images/bg/bg1.mp4"/>
                                                           </video>` );
        var videoContainer = angular.element( document.querySelector( '#video-container' ) );
        videoContainer.append( videoTag );
    }

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


        }, 5 );


    } );

    $rootScope.$on( '$routeChangeError', function () {
        //hide loading gif
        $timeout( ()=> {
            $rootScope.loading = false;
        }, 1 );

    } );
}