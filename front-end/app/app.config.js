/**
 * Created by Galyna on 16.03.2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appConstants;
    function appConfig($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }
    exports_1("appConfig", appConfig);
    function materialConfig($mdThemingProvider, $mdIconProvider) {
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
            .definePalette('customBackground', customBackground);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBackground');
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        $mdIconProvider
            .iconSet("action", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
            .iconSet("social", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
            .iconSet("communication", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
            .iconSet("navigation", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
            .iconSet("av", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg");
    }
    exports_1("materialConfig", materialConfig);
    return {
        setters:[],
        execute: function() {
            exports_1("appConstants", appConstants = {
                baseUrl: '/',
                apiUrl: '/api',
                uploadDir: '/content/uploads'
            });
            appConfig.$inject = ['$compileProvider'];
            materialConfig.$inject = ['$mdThemingProvider', '$mdIconProvider'];
        }
    }
});
//# sourceMappingURL=app.config.js.map