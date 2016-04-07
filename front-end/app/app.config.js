/**
 * Created by Galyna on 16.03.2016.
 */

angular
    .module('ostapRadioApp')
    .constant('constants', {
        baseUrl: '/',
        apiUrl: '/api'
    })
    .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/layout/views/layout.html',
                controller: 'LayoutController',
                controllerAs: "vm"
            })
            .when('/profile', {templateUrl: 'app/users/views/profile.html'})
            .otherwise({redirectTo: '/home'});

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('pink')



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
