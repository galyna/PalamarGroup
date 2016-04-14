(function(){
    angular.module('courses')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/course/:name', {
                    templateUrl: 'app/courses/views/course.html',
                    controller: 'CourseController',
                    controllerAs: "vm"
                });
        });
})();