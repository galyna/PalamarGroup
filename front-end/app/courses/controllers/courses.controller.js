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
            CoursesController = (function () {
                function CoursesController($scope, $sce, $location, pgCalendarData, CourseResource, $mdMedia) {
                    var _this = this;
                    this.$sce = $sce;
                    this.$location = $location;
                    this.pgCalendarData = pgCalendarData;
                    this.CourseResource = CourseResource;
                    this.$mdMedia = $mdMedia;
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
                    this.coursesDateMap = [];
                    this.courses = this.CourseResource.query();
                    this.courses.$promise.then(function (courses) {
                        angular.forEach(courses, function (course) {
                            _this.createDatesMap(course);
                            _this.setCalendarContent(course);
                        });
                    });
                };
                CoursesController.prototype.setCalendarContent = function (course) {
                    var _this = this;
                    angular.forEach(course.courseModulesDates, function (courseDate) {
                        var cDate = new Date(courseDate);
                        var content = " <div class=\"hovereffect course-marker\">\n                       <img class=\"img-responsive\" src=\"" + course.hearFormsPhotos[0].url + "\" alt=\"\">\n                      <div class=\"overlay\">\n                     <h2>" + course.name + "</h2>\n                      <button class=\"md-button detail-btn\" aria-label=\"Play\" >\n                            \u0414\u0435\u0442\u0430\u043B\u0456\n                        </button>\n                       </div>                  \n                    </div>";
                        _this.pgCalendarData.setDayContent(cDate, _this.$sce.trustAsHtml(content));
                    });
                };
                CoursesController.prototype.createDatesMap = function (course) {
                    var coursesDateChunk = course.courseModulesDates.map(function (date) {
                        return { coursesId: course._id, date: date };
                    });
                    this.coursesDateMap = this.coursesDateMap.concat(coursesDateChunk);
                };
                CoursesController.prototype.dayClick = function (date) {
                    var _this = this;
                    angular.forEach(this.coursesDateMap, function (course) {
                        var cDate = new Date(course.date);
                        if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
                            _this.$location.url('/course/' + course.coursesId);
                            return;
                        }
                    });
                };
                CoursesController.prototype.showDetails = function (id) {
                    this.$location.url('/course/' + id);
                };
                CoursesController.$inject = ['$scope', '$sce', '$location', 'pgCalendarData', course_resource_1.CourseResourceName, '$mdMedia'];
                CoursesController.componentName = 'CoursesController';
                return CoursesController;
            }());
            exports_1("CoursesController", CoursesController);
        }
    }
});
//# sourceMappingURL=courses.controller.js.map