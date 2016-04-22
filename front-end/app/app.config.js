/**
 * Created by Galyna on 16.03.2016.
 */

angular
    .module('yuliaPalamarApp')
    .constant('constants', {
        baseUrl: '/',
        apiUrl: '/api',
        uploadDir: '/content/uploads'
    })
    .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/courses/views/courses.html',
                controller: 'CoursesController',
                controllerAs: "vm"
            })
            .when('/admin', {
                templateUrl: 'app/admin/views/admin.html',
                controller: 'AdminController',
                controllerAs: "vm"
            })
           
            .otherwise({redirectTo: '/home'});


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
            .iconSet("action", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
            .iconSet("social", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
            .iconSet("communication", "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
            .iconSet("navigation", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
            .iconSet("av", "../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg")


    }).run(function ($http, $templateCache) {
    var urls = [
        '../node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg',
        "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-action.svg",
        "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-social.svg",
        "../node_modules//material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg"
    ];
    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach(urls, function (url) {
        $http.get(url, {cache: $templateCache});
    });
})
;
