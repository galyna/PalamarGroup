System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderController;
    return {
        setters:[],
        execute: function() {
            OrderController = (function () {
                function OrderController(orderService) {
                    var _this = this;
                    this.orderService = orderService;
                    this.orderService.get().then(function (orders) {
                        _this.orders = orders;
                    });
                }
                OrderController.$inject = ['orderService'];
                OrderController.componentName = 'OrderController';
                return OrderController;
            }());
            exports_1("OrderController", OrderController);
        }
    }
});
//# sourceMappingURL=order.controller.js.map