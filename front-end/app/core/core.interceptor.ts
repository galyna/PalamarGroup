
import {IRootScope} from "../../typings";

httpInterceptorConfig.$inject = ['$httpProvider'];
export function httpInterceptorConfig($httpProvider: ng.IHttpProvider) {
    $httpProvider.interceptors.push(loadingInterceptor);
}

loadingInterceptor.$inject = ['$q', '$rootScope'];
function loadingInterceptor ($q: ng.IQService, $rootScope: IRootScope) {
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
            return $q.reject(rejection);
        },
        responseError: function (rejection) {
            $rootScope.loading = false;
            return $q.reject(rejection);
        }
    };
}