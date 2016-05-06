/**
 * Created by Galyna on 08.04.2016.
 */
System.register(['./admin.routes', './controllers/order.controller', './controllers/admin.controller', "../services/course.service", "../services/order.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var admin_routes_1, order_controller_1, admin_controller_1, course_service_1, order_service_1;
    var app, adminModule;
    return {
        setters:[
            function (admin_routes_1_1) {
                admin_routes_1 = admin_routes_1_1;
            },
            function (order_controller_1_1) {
                order_controller_1 = order_controller_1_1;
            },
            function (admin_controller_1_1) {
                admin_controller_1 = admin_controller_1_1;
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
                .controller(order_controller_1.OrderController.componentName, order_controller_1.OrderController)
                .service(course_service_1.CourseService.componentName, course_service_1.CourseService)
                .service(order_service_1.OrderService.componentName, order_service_1.OrderService);
            exports_1("adminModule", adminModule = app);
        }
    }
});
//# sourceMappingURL=admin.module.js.map