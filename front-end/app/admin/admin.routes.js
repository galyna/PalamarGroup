System.register(['./academy/controllers/orders.controller', './academy/controllers/courses.controller', './academy/controllers/models.controller', './academy/controllers/delivery.controller', './academy/controllers/contacts.controller', './controllers/admin.controller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var orders_controller_1, courses_controller_1, models_controller_1, delivery_controller_1, contacts_controller_1, admin_controller_1;
    function coursesRoutes($routeProvider) {
        $routeProvider
            .when('/admin', {
            templateUrl: 'app/admin/views/admin.html',
            controller: admin_controller_1.AdminController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy', {
            templateUrl: 'app/admin/academy/views/courses.html',
            controller: courses_controller_1.AcademyCoursesController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/salon', {
            templateUrl: 'app/admin/salon/views/salon.html',
            controller: courses_controller_1.AcademyCoursesController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy/orders', {
            templateUrl: 'app/admin/academy/views/orders.html',
            controller: orders_controller_1.AcademyOrdersController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy/models', {
            templateUrl: 'app/admin/academy/views/models.html',
            controller: models_controller_1.AcademyModelController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy/delivery', {
            templateUrl: 'app/admin/academy/views/delivery.html',
            controller: delivery_controller_1.AcademyDeliveryController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy/contacts', {
            templateUrl: 'app/admin/academy/views/contacts.html',
            controller: contacts_controller_1.AcademyContactsController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/academy/courses', {
            templateUrl: 'app/admin/academy/views/courses.html',
            controller: courses_controller_1.AcademyCoursesController.componentName,
            controllerAs: "vm"
        });
    }
    exports_1("coursesRoutes", coursesRoutes);
    return {
        setters:[
            function (orders_controller_1_1) {
                orders_controller_1 = orders_controller_1_1;
            },
            function (courses_controller_1_1) {
                courses_controller_1 = courses_controller_1_1;
            },
            function (models_controller_1_1) {
                models_controller_1 = models_controller_1_1;
            },
            function (delivery_controller_1_1) {
                delivery_controller_1 = delivery_controller_1_1;
            },
            function (contacts_controller_1_1) {
                contacts_controller_1 = contacts_controller_1_1;
            },
            function (admin_controller_1_1) {
                admin_controller_1 = admin_controller_1_1;
            }],
        execute: function() {
            coursesRoutes.$inject = ['$routeProvider'];
        }
    }
});
//# sourceMappingURL=admin.routes.js.map