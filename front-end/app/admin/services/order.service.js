(function () {
    angular.module('admin')
        .service('orderService', OrderService);
    
    OrderService.$inject = ['$http', 'constants'];
    function OrderService($http, constants) {
        var url = constants.apiUrl + '/order';
        
        this.get = get;
        
        function get(id) {
            var actualUrl = id ? url + '/' + id : url;
            
            return $http.get(actualUrl).then(function (data) {
                return data.data;
            });
        }
    }
})();