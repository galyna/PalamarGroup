import {CoursesController} from './controllers/courses.controller';
import {CourseController} from './controllers/course.controller';

coursesRoutes.$inject = ['$routeProvider'];
export function coursesRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/courses', {
            templateUrl: 'app/courses/views/coursrs.cards.html',
            controller: CoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/course/:id', {
            templateUrl: 'app/courses/views/course.html',
            controller: CourseController.componentName,
            controllerAs: "vm"
        })
        .when('/test', {
            templateUrl: 'app/courses/views/test.html',
            controller: 'TestController',
            controllerAs: "vm"
        });
}