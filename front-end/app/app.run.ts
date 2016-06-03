import {IRootScope} from "../typings";
appRun.$inject = ['$http', '$templateCache', '$rootScope', '$location'];
export function appRun($http: ng.IHttpService, $templateCache: ng.ITemplateCacheService,
$rootScope: IRootScope, $location: ng.ILocationService) {

    $rootScope.isAdminZone = () => {
        return $location.path().indexOf('/admin') === 0;
    };

    var urls = [
        '/content/images/icons/svg-sprite-navigation.svg',
        "/content/images/icons/svg-sprite-action.svg",
        "/content/images/icons/svg-sprite-social.svg",
        "/content/images/icons/svg-sprite-communication.svg"
    ];
    // Pre-fetch icons sources by URL and cache in the $templateCache...
    // subsequent $http calls will look there first.
    angular.forEach(urls, function (url) {
        $http.get(url, {cache: $templateCache});
    });
}