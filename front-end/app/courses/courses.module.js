System.register(['./courses.routes', './controllers/courses.controller', './controllers/test.controller', "../services/course.service", "./controllers/course.controller", "../services/order.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var courses_routes_1, courses_controller_1, test_controller_1, course_service_1, course_controller_1, order_service_1;
    var app, coursesModule;
    return {
        setters:[
            function (courses_routes_1_1) {
                courses_routes_1 = courses_routes_1_1;
            },
            function (courses_controller_1_1) {
                courses_controller_1 = courses_controller_1_1;
            },
            function (test_controller_1_1) {
                test_controller_1 = test_controller_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (course_controller_1_1) {
                course_controller_1 = course_controller_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            }],
        execute: function() {
            app = angular.module('courses', ['ngMaterial'])
                .config(courses_routes_1.coursesRoutes)
                .controller(courses_controller_1.CoursesController.componentName, courses_controller_1.CoursesController)
                .controller(course_controller_1.CourseController.componentName, course_controller_1.CourseController)
                .controller(test_controller_1.TestController.componentName, test_controller_1.TestController)
                .service(course_service_1.CourseService.componentName, course_service_1.CourseService)
                .service(order_service_1.OrderService.componentName, order_service_1.OrderService);
            exports_1("coursesModule", coursesModule = app);
        }
    }
});
//# sourceMappingURL=courses.module.js.map