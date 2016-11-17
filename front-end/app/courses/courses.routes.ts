import {CoursesController} from './controllers/courses.controller';
import {CourseController} from './controllers/course.controller';
import {CourseCalendarComponentUrl} from "./components/course.calendar.component";
import {AcademyContactComponentUrl} from "./components/academy.contacts.component";
import {AcademyVideoComponentUrl} from "./components/academy.video.component";

coursesRoutes.$inject = ['$routeProvider'];
export function coursesRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/academy', {
            templateUrl: 'app/courses/views/coursrs.cards.html',
            controller: CoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/academy/course/:id', {
            templateUrl: 'app/courses/views/courses.details.html',
            controller: CourseController.componentName,
            controllerAs: "vm"
        })
        .when(CourseCalendarComponentUrl, {
            template: '<pg-course-calendar></pg-course-calendar>',
        })
        .when(AcademyContactComponentUrl, {
            template: '<pg-academy-contact></pg-academy-contact>',
        })
        .when(AcademyVideoComponentUrl, {
            template: '<pg-academy-video></pg-academy-video>',
        })
        .when('/test', {
            templateUrl: 'app/courses/views/test.html',
            controller: 'TestController',
            controllerAs: "vm"
        });
}