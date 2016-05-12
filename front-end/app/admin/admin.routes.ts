import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AdminController} from './controllers/admin.controller';

coursesRoutes.$inject = ['$routeProvider'];
export function coursesRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/admin', {
            templateUrl: 'app/admin/views/admin.html',
            controller: AdminController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy', {
            templateUrl: 'app/admin/academy/views/courses.html',
            controller: AcademyCoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/salon', {
            templateUrl: 'app/admin/salon/views/salon.html',
            controller: AcademyCoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/orders', {
            templateUrl: 'app/admin/academy/views/orders.html',
            controller: AcademyOrdersController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/courses', {
            templateUrl: 'app/admin/academy/views/courses.html',
            controller: AcademyCoursesController.componentName,
            controllerAs: "vm"
        });
}