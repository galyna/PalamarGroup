import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminCourseComponentUrl} from "./academy/components/course.component";
import {AdminCoursesComponentUrl} from "./academy/components/courses.component";
import {AdminOrdersComponentUrl} from "./academy/components/orders.component";
import {testComponentUrl} from "./components/test.component";
import {ItServiceName, ItService} from "../users/services/it.service";
import {usersComponentUrl} from "./components/users.component";
import {userComponentUrl} from "./components/user.component";
import {CommentsComponentUrl} from "./academy/components/comments.component";

adminRoutes.$inject = ['$routeProvider'];
export function adminRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when(AdminOrdersComponentUrl, {
            template: '<pg-admin-orders></pg-admin-orders>',
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .when(AdminCoursesComponentUrl, {
            template: "<pg-admin-courses layout='column' ng-cloak></pg-admin-courses>",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .when(AdminCourseComponentUrl, {
            template: "<pg-admin-course layout flex></pg-admin-course>",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('modifyAcademy')]
            }
        })
        
        .when(usersComponentUrl, {
            template: "<pg-users layout='column'></pg-users>",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.isAsync('admin')]
            }
        })
        .when(userComponentUrl, {
            template: "<pg-user layout flex></pg-user>",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.isAsync('admin')]
            }
        })
        .when(testComponentUrl, {
            template: '<pg-test></pg-test>'
        })
        .when('/academy/models', {
            templateUrl: 'app/admin/academy/views/models.html',
            controller: AcademyModelController.componentName,
            controllerAs: "vm",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .when('/academy/delivery', {
            templateUrl: 'app/admin/academy/views/delivery.html',
            controller: AcademyDeliveryController.componentName,
            controllerAs: "vm",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .when('/academy/contacts', {
            templateUrl: 'app/admin/academy/views/contacts.html',
            controller: AcademyContactsController.componentName,
            controllerAs: "vm",
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .when(CommentsComponentUrl, {
            template: '<pg-comments></pg-comments>',
            resolve: {
                auth: [ItServiceName, (it: ItService) => it.canAsync('readAcademy')]
            }
        })
        .otherwise({
            redirectTo: '/academy/courses'
        });
}