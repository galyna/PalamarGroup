/**
 * Created by Galyna on 13.04.2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CoursesController;
    return {
        setters:[],
        execute: function() {
            CoursesController = (function () {
                function CoursesController($scope, $location, courseService) {
                    var _this = this;
                    this.$location = $location;
                    this.courseService = courseService;
                    $scope.$on("$destroy", function () {
                        _this.courses = null;
                        _this.showDetails = null;
                    });
                    //init page data
                    this.getCourses();
                }
                CoursesController.prototype.getCourses = function () {
                    var _this = this;
                    this.courseService.get().then(function (data) {
                        _this.courses = data;
                        // this.courses.forEach((item) => {
                        //     item.courseModulesDates = item.courseModulesDates.map((date) => {
                        //         return new Date(date);
                        //     });
                        // });
                    });
                };
                CoursesController.prototype.showDetails = function (id) {
                    this.$location.url('/course/' + id);
                };
                CoursesController.$inject = ['$scope', '$location', 'courseService'];
                CoursesController.componentName = 'CoursesController';
                return CoursesController;
            }());
            exports_1("CoursesController", CoursesController);
        }
    }
});
//# sourceMappingURL=courses.controller.js.map