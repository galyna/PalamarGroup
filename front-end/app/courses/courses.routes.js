(function(){
    angular.module('courses')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/course/:name', {
                    templateUrl: 'app/courses/views/course.html',
                    controller: 'CourseController',
                    controllerAs: "vm"
                })
                .when('/test', {
                    templateUrl: 'app/courses/views/test.html',
                    controller: 'TestController',
                    controllerAs: "vm"
                });
        });
})();