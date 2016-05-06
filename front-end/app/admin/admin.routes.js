System.register(['./controllers/order.controller', './controllers/admin.controller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var order_controller_1, admin_controller_1;
    function coursesRoutes($routeProvider) {
        $routeProvider
            .when('/admin', {
            templateUrl: 'app/admin/views/admin.html',
            controller: admin_controller_1.AdminController.componentName,
            controllerAs: "vm"
        })
            .when('/admin/order', {
            templateUrl: 'app/admin/views/orders.html',
            controller: order_controller_1.OrderController.componentName,
            controllerAs: "vm"
        });
    }
    exports_1("coursesRoutes", coursesRoutes);
    return {
        setters:[
            function (order_controller_1_1) {
                order_controller_1 = order_controller_1_1;
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