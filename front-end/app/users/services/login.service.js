/**
 * Created by Galyna on 16.03.2016.
 */
(function () {
    'use strict';

    angular.module('users')
        .factory('LoginService', ['$http', '$log', 'constants', LoginService]);

    /**
     * Login DataService
     * Login embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{login: Function}}
     * @constructor
     */
    function LoginService($http, $log, constants) {
        var apiUrl = constants.apiUrl;
        var url = {
            login: apiUrl + '/authenticate'
        };

        return {
            login: function (creds) {
                return $http.post(url.login, creds).then(function(res){
                    $http.defaults.headers.common['x-auth-token'] = res.data.token;
                    return res.data.user;
                }).catch(function(err){
                    $log.error(err);
                });
            }
        };
    }

})();
