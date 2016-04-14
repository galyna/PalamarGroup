/**
 * Created by Galyna on 08.04.2016.
 */
(function(){
    'use strict';

    angular.module('courses').service('courseService', CourseService);

    CourseService.$inject = ['$http', 'constants'];

    function CourseService($http, constants){
        var url = constants.apiUrl + '/course';
        //TODO: implement filtering
        this.get = function(id){
            var getUrl = id ? url + '/' + id : url;
            return $http.get(getUrl).then(function(res){
                return res.data;
            });
        };
        
    }
})();

