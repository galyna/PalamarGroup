export function appRun($http: ng.IHttpService, $templateCache: ng.ITemplateCacheService) {
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
}