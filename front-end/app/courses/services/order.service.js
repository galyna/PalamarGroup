(function(){
    'use strict';

    angular.module('courses').service('orderService', OrderService);

    OrderService.$inject = ['$http', 'constants'];

    function OrderService($http, constants){
        var url = constants.apiUrl + '/order';
        
        this.get = get;
        this.post = post;
        
        //TODO: implement filtering
        function get(id){
            var getUrl = id ? url + '/' + id : url;
            return $http.get(getUrl).then(function(res){
                return res.data;
            });
        }

        function post(order){
            return $http.post(url, order).then(function(res){
                return res.data;
            });
        }
        
    }
})();

