System.register(["../../resources/course.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var course_resource_1;
    var template, CalendarComponentController, CourseCalendarComponentUrl, CourseCalendarComponentName, CourseCalendarComponentOptions;
    return {
        setters:[
            function (course_resource_1_1) {
                course_resource_1 = course_resource_1_1;
            }],
        execute: function() {
            template = "<div layout=\"row\" flex layout-align=\"center stretch\"> <pg-calendar \n                             calendar-direction=\"$ctrl.calendarDirection\"\n                             on-prev-month=\"prevMonth\"\n                             on-next-month=\"nextMonth\"\n                             on-day-click=\"$ctrl.dayClick(date)\"\n                             title-format=\"'MMMM y'\"\n                             ng-model='selectedDate'\n                             day-format=\"'d'\"\n                             day-label-format=\"'EEE'\"\n                             day-label-tooltip-format=\"'EEEE'\"\n                             day-tooltip-format=\"'fullDate'\"\n                             week-starts-on=\"firstDayOfWeek\"\n                             day-content=\"setDayContent\"\n                             template-url=\"'app/calendar/calendar.html'\"></pg-calendar> </div>";
            CalendarComponentController = (function () {
                function CalendarComponentController(pgCalendarData, CourseResource, $sce, $location, orderByFilter, smoothScroll) {
                    this.pgCalendarData = pgCalendarData;
                    this.CourseResource = CourseResource;
                    this.$sce = $sce;
                    this.$location = $location;
                    this.orderByFilter = orderByFilter;
                    this.smoothScroll = smoothScroll;
                    this.calendarDirection = 'horizontal';
                    this.getCourses();
                }
                CalendarComponentController.prototype.setCoursesCalendarTemplate = function (picture, name) {
                    if (!!('ontouchstart' in window)) {
                        return " <div class=\"touch-device course-marker\">\n                       <img  src=\"" + picture + "\" alt=\"\">\n                      <div class=\"overlay\">\n                     <h2>" + name + "</h2>                    \n                       </div>                  \n                    </div>";
                    }
                    else {
                        return " <div class=\"hovereffect course-marker\">\n                       <img  src=\"" + picture + "\" alt=\"\">\n                      <div class=\"overlay\">\n                     <h2>" + name + "</h2>\n                      <button class=\"md-button detail-btn\" aria-label=\"Play\" >\n                            \u0414\u0435\u0442\u0430\u043B\u0456\n                        </button>\n                       </div>                  \n                    </div>";
                    }
                };
                CalendarComponentController.prototype.getCourses = function () {
                    var _this = this;
                    this.coursesDateMap = [];
                    this.courses = this.CourseResource.query();
                    this.courses.$promise.then(function (courses) {
                        _this.courses = _this.orderByFilter(courses, "order");
                        angular.forEach(courses, function (course) {
                            if (course.isVisible) {
                                _this.createDatesMap(course);
                                _this.setCalendarContent(course);
                            }
                        });
                        _this.scrollToMain();
                    });
                };
                CalendarComponentController.prototype.scrollToMain = function () {
                    var options = {
                        duration: 700,
                        easing: 'easeInQuad',
                        offset: 0,
                    };
                    var element = document.getElementById('mainContent');
                    this.smoothScroll(element, options);
                };
                CalendarComponentController.prototype.setCalendarContent = function (course) {
                    var _this = this;
                    angular.forEach(course.courseModulesDates, function (courseDate) {
                        var content = _this.setCoursesCalendarTemplate(course.avatar, course.name);
                        _this.pgCalendarData.setDayContent(courseDate, _this.$sce.trustAsHtml(content));
                    });
                };
                CalendarComponentController.prototype.createDatesMap = function (course) {
                    //TODO: change coursesDateMap.date to Date[] like in CourseResourse
                    var coursesDateChunk = course.courseModulesDates.map(function (date) {
                        return { coursesId: course._id, date: date.toJSON() };
                    });
                    this.coursesDateMap = this.coursesDateMap.concat(coursesDateChunk);
                };
                CalendarComponentController.prototype.dayClick = function (date) {
                    var _this = this;
                    angular.forEach(this.coursesDateMap, function (course) {
                        var cDate = new Date(course.date);
                        if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
                            _this.$location.url('/course/' + course.coursesId);
                            return;
                        }
                    });
                };
                CalendarComponentController.$inject = ['pgCalendarData', course_resource_1.CourseResourceName, '$sce', '$location', 'orderByFilter', 'smoothScroll'];
                return CalendarComponentController;
            }());
            exports_1("CalendarComponentController", CalendarComponentController);
            exports_1("CourseCalendarComponentUrl", CourseCalendarComponentUrl = "/calendar");
            exports_1("CourseCalendarComponentName", CourseCalendarComponentName = 'pgCourseCalendar');
            exports_1("CourseCalendarComponentOptions", CourseCalendarComponentOptions = {
                template: template,
                controller: CalendarComponentController
            });
        }
    }
});
//# sourceMappingURL=course.calendar.component.js.map