///<reference path="../../typings/browser.extensions.d.ts"/>
import {IRootScope} from "../typings";


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