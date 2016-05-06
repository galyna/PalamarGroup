/**
 * Created by Galyna on 16.03.2016.
 */

export interface IConstants{
    baseUrl: string,
    apiUrl: string,
    uploadDir: string
}

export let appConstants: IConstants = {
    baseUrl: '/',
    apiUrl: '/api',
    uploadDir: '/content/uploads'
};

appConfig.$inject = ['$compileProvider'];
export function appConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}

materialConfig.$inject = ['$mdThemingProvider', '$mdIconProvider'];
export function materialConfig($mdThemingProvider:ng.material.IThemingProvider,
                               $mdIconProvider:ng.material.IIconProvider) {
    var customBackground = {
        '50': '#737373',
        '100': '#666666',
        '200': '#595959',
        '300': '#4d4d4d',
        '400': '#404040',
        '500': '#333',
        '600': '#262626',
        '700': '#1a1a1a',
        '800': '#0d0d0d',
        '900': '#000000',
        'A100': '#808080',
        'A200': '#8c8c8c',
        'A400': '#999999',
        'A700': '#000000'
    };
    $mdThemingProvider
        .definePalette('customBackground',
            customBackground);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBackground');
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    
    $mdIconProvider
        .iconSet("action", "/content/images/icons/svg-sprite-action.svg")
        .iconSet("social", "/content/images/icons/svg-sprite-social.svg")
        .iconSet("communication", "/content/images/icons/svg-sprite-communication.svg")
        .iconSet("navigation", "/content/images/icons/svg-sprite-navigation.svg")
        .iconSet("av", "/content/images/icons/svg-sprite-av.svg")
}
