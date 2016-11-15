import {IRootScope} from "../typings";
/**
 * Created by Galyna on 16.03.2016.
 */

materialConfig.$inject = ['uiGmapGoogleMapApiProvider','$mdThemingProvider','$locationProvider'];
export function materialConfig(uiGmapGoogleMapApiProvider,$mdThemingProvider,$locationProvider) {
   // $locationProvider.hashPrefix('!');
    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': '000000',
        '100': '000000',
        '200': '000000',
        '300': '000000',
        '500': '000000',
        '400': '000000',
        '600': '000000',
        '700': '000000',
        '800': '000000',
        '900': '000000',
        'A100': '000000',
        'A200': '000000',
        'A400': '000000',
        'A700': '000000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastLightColors':undefined ,
        'contrastDarkColors':['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100']     // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('amazingPaletteName')

    uiGmapGoogleMapApiProvider.configure( {
        key: 'AIzaSyCIta-syyAj-btYL9IMx5262_LCEC_U0No',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    } );

}
