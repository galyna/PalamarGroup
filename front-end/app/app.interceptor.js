System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function httpInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push(httpInterceptor);
    }
    exports_1("httpInterceptorConfig", httpInterceptorConfig);
    function httpInterceptor($q, $rootScope) {
        return {
            request: function (config) {
                $rootScope.loading = true;
                return config;
            },
            response: function (response) {
                $rootScope.loading = false;
                return response;
            },
            requestError: function (rejection) {
                $rootScope.loading = false;
                $q.reject(rejection);
            },
            responseError: function (rejection) {
                $rootScope.loading = false;
                $q.reject(rejection);
            }
        };
    }
    return {
        setters:[],
        execute: function() {
            httpInterceptorConfig.$inject = ['$httpProvider'];
            httpInterceptor.$inject = ['$q', '$rootScope'];
        }
    }
});
//# sourceMappingURL=app.interceptor.js.map