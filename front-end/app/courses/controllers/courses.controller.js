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
                function CoursesController($scope, $location, pgCalendarData, CourseResource, $mdMedia) {
                    var _this = this;
                    this.$location = $location;
                    this.pgCalendarData = pgCalendarData;
                    this.CourseResource = CourseResource;
                    this.$mdMedia = $mdMedia;
                    this.tooltips = true;
                    this.calendarDirection = 'horizontal';
                    $scope.$on("$destroy", function () {
                        _this.courses = null;
                        _this.showDetails = null;
                    });
                    //init calendar direction
                    this.calendarDirection = this.$mdMedia('max-width: 600px') ? 'vertical' : 'horizontal';
                    $scope.$watch(function () {
                        return _this.$mdMedia('max-width: 600px');
                    }, function (sm) {
                        _this.calendarDirection = sm ? 'vertical' : 'horizontal';
                    });
                    //init page data
                    this.getCourses();
                }
                CoursesController.prototype.getCourses = function () {
                    var _this = this;
                    this.courses = this.CourseResource.query();
                    this.courses.$promise.then(function (courses) {
                        angular.forEach(courses, function (course) {
                            angular.forEach(course.courseModulesDates, function (courseDate) {
                                var cDate = new Date(courseDate);
                                var content = "<div>\n                        <img src=\"" + course.hearFormsPhotos[0].url + "\"/>\n                        <span>" + course.name + "</span>\n                    </div>";
                                _this.pgCalendarData.setDayContent(cDate, content);
                            });
                        });
                    });
                };
                CoursesController.prototype.showDetails = function (id) {
                    this.$location.url('/course/' + id);
                };
                CoursesController.$inject = ['$scope', '$location', 'pgCalendarData', course_resource_1.CourseResourceName, '$mdMedia'];
                CoursesController.componentName = 'CoursesController';
                return CoursesController;
            }());
            exports_1("CoursesController", CoursesController);
        }
    }
});
//# sourceMappingURL=courses.controller.js.map