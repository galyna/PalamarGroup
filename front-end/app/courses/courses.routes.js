System.register(['./controllers/courses.controller', './controllers/course.controller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var courses_controller_1, course_controller_1;
    function coursesRoutes($routeProvider) {
        $routeProvider
            .when('/courses', {
            templateUrl: 'app/courses/views/coursrs.cards.html',
            controller: courses_controller_1.CoursesController.componentName,
            controllerAs: "vm"
        })
            .when('/course/:id', {
            templateUrl: 'app/courses/views/course.html',
            controller: course_controller_1.CourseController.componentName,
            controllerAs: "vm"
        })
            .when('/test', {
            templateUrl: 'app/courses/views/test.html',
            controller: 'TestController',
            controllerAs: "vm"
        });
    }
    exports_1("coursesRoutes", coursesRoutes);
    return {
        setters:[
            function (courses_controller_1_1) {
                courses_controller_1 = courses_controller_1_1;
            },
            function (course_controller_1_1) {
                course_controller_1 = course_controller_1_1;
            }],
        execute: function() {
            coursesRoutes.$inject = ['$routeProvider'];
        }
    }
});
//# sourceMappingURL=courses.routes.js.map