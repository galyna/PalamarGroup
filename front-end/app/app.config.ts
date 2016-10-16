import {IRootScope} from "../typings";
/**
 * Created by Galyna on 16.03.2016.
 */

materialConfig.$inject = ['$mdThemingProvider','uiGmapGoogleMapApiProvider'];
export function materialConfig($mdThemingProvider:ng.material.IThemingProvider,uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    // var customBackground = {
    //     '50': '#737373',
    //     '100': '#666666',
    //     '200': '#595959',
    //     '300': '#4d4d4d',
    //     '400': '#404040',
    //     '500': '#333',
    //     '600': '#262626',
    //     '700': '#1a1a1a',
    //     '800': '#0d0d0d',
    //     '900': '#000000',
    //     'A100': '#808080',
    //     'A200': '#8c8c8c',
    //     'A400': '#999999',
    //     'A700': '#000000'
    // };
    // $mdThemingProvider
    //     .definePalette('customBackground',
    //         customBackground);
    // $mdThemingProvider.theme('default')
    //     .primaryPalette('customBackground');
}
