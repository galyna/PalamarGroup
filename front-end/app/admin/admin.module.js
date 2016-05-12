/**
 * Created by Galyna on 08.04.2016.
 */
System.register(['./admin.routes', './academy/controllers/orders.controller', './academy/controllers/courses.controller', './controllers/admin.controller', './academy/controllers/left.menu.controller', "../services/course.service", "../services/order.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var admin_routes_1, orders_controller_1, courses_controller_1, admin_controller_1, left_menu_controller_1, course_service_1, order_service_1;
    var app, adminModule;
    return {
        setters:[
            function (admin_routes_1_1) {
                admin_routes_1 = admin_routes_1_1;
            },
            function (orders_controller_1_1) {
                orders_controller_1 = orders_controller_1_1;
            },
            function (courses_controller_1_1) {
                courses_controller_1 = courses_controller_1_1;
            },
            function (admin_controller_1_1) {
                admin_controller_1 = admin_controller_1_1;
            },
            function (left_menu_controller_1_1) {
                left_menu_controller_1 = left_menu_controller_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            }],
        execute: function() {
            app = angular.module('admin', ['ngMaterial'])
                .config(admin_routes_1.coursesRoutes)
                .controller(admin_controller_1.AdminController.componentName, admin_controller_1.AdminController)
                .controller(courses_controller_1.AcademyCoursesController.componentName, courses_controller_1.AcademyCoursesController)
                .controller(orders_controller_1.AcademyOrdersController.componentName, orders_controller_1.AcademyOrdersController)
                .controller(left_menu_controller_1.LeftMenuController.componentName, left_menu_controller_1.LeftMenuController)
                .service(course_service_1.CourseService.componentName, course_service_1.CourseService)
                .service(order_service_1.OrderService.componentName, order_service_1.OrderService);
            exports_1("adminModule", adminModule = app);
        }
    }
});
//# sourceMappingURL=admin.module.js.map