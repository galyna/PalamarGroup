(function(){
    'use strict';

    angular.module('users').service('userService', UserService);

    UserService.$inject = ['$http', 'constants'];
    function UserService($http, constants){
        var url = constants.apiUrl + '/user';
        //TODO: implement filtering
        this.get = function(email){
            var getUrl = email ? url + '/' + email : url;
                return $http.get(getUrl).then(function(res){
                    return res.data;
                });
        };

        this.post = function(user){
            return $http.post(url, user).then(function(res){
                return res.data;
            });
        };

        this.put = function(email, user){
            return $http.put(url + '/' + email, user).then(function(res){
                return res.data;
            });
        };
        
        this.delete = function(email){
            return $thhp.delete(url + '/' + email).then(function(res){
                return res.data;
            });
        }
    }
})();