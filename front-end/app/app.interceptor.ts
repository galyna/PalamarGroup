
import {IRootScope} from "../typings";

httpInterceptorConfig.$inject = ['$httpProvider'];
export function httpInterceptorConfig($httpProvider: ng.IHttpProvider) {
    $httpProvider.interceptors.push(httpInterceptor);
}

httpInterceptor.$inject = ['$q', '$rootScope'];
function httpInterceptor ($q: ng.IQService, $rootScope: IRootScope) {
    return {
        request: function (config: ng.IRequestConfig) {
            $rootScope.loading = true;
            return config;
        },

        response: function (response: ng.IHttpPromiseCallbackArg<any>) {
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