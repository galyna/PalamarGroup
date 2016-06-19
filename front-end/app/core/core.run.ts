coreRun.$inject = ['$http', '$templateCache'];
export function coreRun($http:ng.IHttpService, $templateCache:ng.ITemplateCacheService) {
    var urls = [
        '/content/images/icons/svg-sprite-navigation.svg',
        "/content/images/icons/svg-sprite-action.svg",
        "/content/images/icons/svg-sprite-social.svg",
        "/content/images/icons/svg-sprite-communication.svg"
    ];
    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach( urls, function (url) {
        $http.get( url, {cache: $templateCache} );
    } );
}