routesConfig.$inject = ['$routeProvider'];
export function routesConfig($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/home', {redirectTo: '/courses'})
        .otherwise({redirectTo: '/home'});
}