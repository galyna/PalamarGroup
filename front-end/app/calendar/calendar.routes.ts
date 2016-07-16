/**
 * Created by Galyna on 16.07.2016.
 */
routesConfig.$inject = ['$routeProvider'];
export function routesConfig($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/calendar', {
            templateUrl: 'app/calendar/views/calendar.html',
            controller: CoursesController.componentName,
            controllerAs: "vm"
        })
}
