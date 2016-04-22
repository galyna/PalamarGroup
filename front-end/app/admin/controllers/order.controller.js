(function () {
    angular.module('admin')
        .controller('OrderController', OrderController);
    
    OrderController.$inject = ['orderService'];
    function OrderController(orderService) {
        var vm = this;
        
        orderService.get().then(function (orders) {
            vm.orders = orders;
        });
    }
})();