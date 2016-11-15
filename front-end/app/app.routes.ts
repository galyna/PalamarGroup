import {SalonHomeComponentUrl} from "./salon/components/salon.home.component";
routesConfig.$inject = ['$routeProvider'];
export function routesConfig($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .otherwise({redirectTo: SalonHomeComponentUrl});
}