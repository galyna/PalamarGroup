System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AcademyOrdersController;
    return {
        setters:[],
        execute: function() {
            AcademyOrdersController = (function () {
                function AcademyOrdersController(orderService, $location) {
                    var _this = this;
                    this.orderService = orderService;
                    this.$location = $location;
                    this.orderService.get().then(function (orders) {
                        _this.orders = orders;
                    });
                }
                AcademyOrdersController.prototype.deleteOrder = function (item) {
                    var _this = this;
                    this.orderService.delete(item._id).then(function () {
                        _this.orders.splice(_this.orders.indexOf(item), 1);
                    });
                };
                AcademyOrdersController.prototype.answerOrder = function (item) {
                    var _this = this;
                    item.answered = true;
                    this.orderService.put(item._id, item).then(function () {
                        _this.orders.splice(_this.orders.indexOf(item), 1, item);
                    });
                };
                AcademyOrdersController.$inject = ['orderService', '$location'];
                AcademyOrdersController.componentName = 'AcademyOrdersController';
                return AcademyOrdersController;
            }());
            exports_1("AcademyOrdersController", AcademyOrdersController);
        }
    }
});
//# sourceMappingURL=orders.controller.js.map