import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminController} from './controllers/admin.controller';
import {AcademyCommentController} from "./academy/controllers/comments.controller";

adminRoutes.$inject = ['$routeProvider'];
export function adminRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/salon', {
            templateUrl: 'app/admin/salon/views/salon.html',
            controller: AcademyCoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/orders', {
            template: '<pg-admin-orders></pg-admin-orders>'
        })
        .when('/academy/models', {
            templateUrl: 'app/admin/academy/views/models.html',
            controller: AcademyModelController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/delivery', {
            templateUrl: 'app/admin/academy/views/delivery.html',
            controller: AcademyDeliveryController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/contacts', {
            templateUrl: 'app/admin/academy/views/contacts.html',
            controller: AcademyContactsController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/comments', {
            templateUrl: 'app/admin/academy/views/comments.html',
            controller: AcademyCommentController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/courses', {
            template: "<pg-admin-courses></pg-admin-courses>"
        })
        .otherwise({
            redirectTo: '/academy/courses'
        });
}