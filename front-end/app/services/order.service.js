System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderService;
    return {
        setters:[],
        execute: function() {
            OrderService = (function () {
                function OrderService($http, constants) {
                    this.$http = $http;
                    this.url = constants.apiUrl + '/order';
                }
                //TODO: implement filtering
                OrderService.prototype.get = function (id) {
                    var getUrl = id ? this.url + '/' + id : this.url;
                    return this.$http.get(getUrl).then(function (res) {
                        return res.data;
                    });
                };
                OrderService.prototype.post = function (order) {
                    return this.$http.post(this.url, order).then(function (res) {
                        return res.data;
                    });
                };
                OrderService.$inject = ['$http', 'constants'];
                OrderService.componentName = 'orderService';
                return OrderService;
            }());
            exports_1("OrderService", OrderService);
        }
    }
});
//# sourceMappingURL=order.service.js.map