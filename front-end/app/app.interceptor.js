(function () {
    angular.module('yuliaPalamarApp')
        .config(['$httpProvider', function($httpProvider){
            $httpProvider.interceptors.push(['$q', '$rootScope', function($q, $rootScope) {
                return {
                    'request': function(config) {
                        $rootScope.loading = true;
                        return config;
                    },

                    'response': function(response) {
                        $rootScope.loading = false;
                        return response;
                    },
                    'requestError': function (rejection) {
                        $rootScope.loading = false;
                        $q.reject(rejection);
                    },
                    'responseError': function (rejection) {
                        $rootScope.loading = false;
                        $q.reject(rejection);
                    }
                };
            }]);
        }])
})();