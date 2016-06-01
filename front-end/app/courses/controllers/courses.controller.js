System.register(["../../resources/course.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var course_resource_1;
    var CoursesController;
    return {
        setters:[
            function (course_resource_1_1) {
                course_resource_1 = course_resource_1_1;
            }],
        execute: function() {
            /**
             * Created by Galyna on 13.04.2016.
             */
            CoursesController = (function () {
                function CoursesController($scope, $location, CourseResource) {
                    var _this = this;
                    this.$location = $location;
                    this.CourseResource = CourseResource;
                    $scope.$on("$destroy", function () {
                        _this.courses = null;
                        _this.showDetails = null;
                    });
                    //init page data
                    this.getCourses();
                }
                CoursesController.prototype.getCourses = function () {
                    this.courses = this.CourseResource.query();
                };
                CoursesController.prototype.showDetails = function (id) {
                    this.$location.url('/course/' + id);
                };
                CoursesController.$inject = ['$scope', '$location', course_resource_1.CourseResourceName];
                CoursesController.componentName = 'CoursesController';
                return CoursesController;
            }());
            exports_1("CoursesController", CoursesController);
        }
    }
});
//# sourceMappingURL=courses.controller.js.map