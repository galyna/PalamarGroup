import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AcademyCommentController} from "./academy/controllers/comments.controller";
import {AdminCourseComponentUrl} from "./academy/components/course.component";
import {AdminCoursesComponentUrl} from "./academy/components/courses.component";
import {AdminOrdersComponentUrl} from "./academy/components/orders.component";
import {testComponentUrl} from "./components/test.component";

adminRoutes.$inject = ['$routeProvider'];
export function adminRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when(AdminOrdersComponentUrl, {template: '<pg-admin-orders></pg-admin-orders>'})
        .when(AdminCoursesComponentUrl, {template: "<pg-admin-courses layout='column' ng-cloak></pg-admin-courses>"})
        .when(AdminCourseComponentUrl, {template: "<pg-admin-course layout flex></pg-admin-course>"})
        .when(testComponentUrl, {template: '<pg-test></pg-test>'})
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
        // .when('/salon', {
        //     templateUrl: 'app/admin/salon/views/salon.html',
        //     controller: AcademyCoursesController.componentName,
        //     controllerAs: "vm"
        // })
        .otherwise({
            redirectTo: '/academy/courses'
        });
}