(function(){
    angular.module('admin')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/admin/order', {
                    templateUrl: 'app/admin/views/orders.html',
                    controller: 'OrderController',
                    controllerAs: "vm"
                });
        });
})();