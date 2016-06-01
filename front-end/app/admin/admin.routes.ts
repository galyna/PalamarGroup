import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminController} from './controllers/admin.controller';
import {AcademyCommentController} from "./academy/controllers/comments.controller";

adminRoutes.$inject = ['$routeProvider'];
export function adminRoutes($routeProvider:ng.route.IRouteProvider) {
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
        .when('/admin/academy/models', {
            templateUrl: 'app/admin/academy/views/models.html',
            controller: AcademyModelController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/delivery', {
            templateUrl: 'app/admin/academy/views/delivery.html',
            controller: AcademyDeliveryController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/contacts', {
            templateUrl: 'app/admin/academy/views/contacts.html',
            controller: AcademyContactsController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/comments', {
            templateUrl: 'app/admin/academy/views/comments.html',
            controller: AcademyCommentController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/academy/courses', {
            templateUrl: 'app/admin/academy/views/courses.html',
            controller: AcademyCoursesController.componentName,
            controllerAs: "vm"
        });
}