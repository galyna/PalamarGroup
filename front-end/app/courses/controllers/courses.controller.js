/**
 * Created by Galyna on 13.04.2016.
 */
(function () {

    angular
        .module('courses')
        .controller('CoursesController', CoursesController);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    CoursesController.$inject = ['$scope', '$location', 'courseService'];
    function CoursesController($scope, $location, courseService) {
        var vm = this;

        $scope.$on("$destroy", function() {
            vm.courses = null;
            vm.showDetails = null;
        });

        vm.courses = [];
        vm.showDetails = showDetails;

        //init page data
        getCourses();

        function getCourses() {
            courseService.get().then(function (data) {
                vm.courses = data;
                vm.courses.forEach(function (item) {
                    item.courseModulesDates = item.courseModulesDates.map(function (date) {
                        return new Date(date);
                    })
                })
            })
        }

        function showDetails(id) {
            $location.url('/course/' +id);
        }

    }
})
();



