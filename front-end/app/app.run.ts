import {IRootScope} from "../typings";
import AOS from "aos";

appRun.$inject = ['$rootScope', '$timeout','$mdMedia'];
export function appRun($rootScope:IRootScope, $timeout,$mdMedia) {
    $rootScope.socialParams = {
        host: "",
        target: "",
        title: "",
        image: "",
        description: ""
    };

    $rootScope.isBigSize= $mdMedia( 'gt-md' );

    //create a new instance
    AOS.init( {
        disable: 'mobile'
    } );
    //
    // $window.onload = function(e) {
    //
    //     AOS.refresh();
    // }

    $rootScope.$on( '$routeChangeSuccess', function () {
        $timeout( ()=> {
            AOS.refresh();
        }, 10 );

    } );
}