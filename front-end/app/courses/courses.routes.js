System.register(['./controllers/courses.controller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var courses_controller_1;
    function coursesRoutes($routeProvider) {
        $routeProvider
            .when('/courses', {
            templateUrl: 'app/courses/views/courses.html',
            controller: courses_controller_1.CoursesController.componentName,
            controllerAs: "vm"
        })
            .when('/course/:id', {
            templateUrl: 'app/courses/views/course.html',
            controller: 'CourseController',
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
            }],
        execute: function() {
            coursesRoutes.$inject = ['$routeProvider'];
        }
    }
});
//# sourceMappingURL=courses.routes.js.map