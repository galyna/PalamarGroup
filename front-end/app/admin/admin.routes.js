(function(){
    angular.module('admin')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/admin', {
                    templateUrl: 'app/admin/views/admin.html',
                    controller: 'AdminController',
                    controllerAs: "vm"
                })
                .when('/admin/order', {
                    templateUrl: 'app/admin/views/orders.html',
                    controller: 'OrderController',
                    controllerAs: "vm"
                });
        });
})();