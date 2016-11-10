routesConfig.$inject = ['$routeProvider'];
export function routesConfig($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .otherwise({redirectTo: '/home'});
}