System.register(["../../resources/course.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var course_resource_1;
    var TestController;
    return {
        setters:[
            function (course_resource_1_1) {
                course_resource_1 = course_resource_1_1;
            }],
        execute: function() {
            TestController = (function () {
                function TestController($scope, CourseResource, pgCalendarData, $sce, $rootScope, $compile) {
                    var _this = this;
                    this.pgCalendarData = pgCalendarData;
                    CourseResource.query().$promise.then(function (courses) {
                        courses.forEach(function (course) {
                            var $scope = $rootScope.$new(true);
                            $scope.course = course;
                            course.courseModulesDates.forEach(function (dateString) {
                                $scope.date = new Date(dateString);
                                var template = "<div><span>{{date}}</span><md-tooltip>{{course.name}}</md-tooltip></div>";
                                var el = $compile(template)($scope);
                                _this.pgCalendarData.setDayContent($scope.date, $sce.trustAsHtml(el));
                            });
                        });
                    }).catch(function (err) {
                        console.log(err);
                    });
                    // this.items = [
                    //     {url: '/api/photo/test_width.jpeg'},
                    //     {url: '/api/photo/test_height.jpeg'},
                    //     {url: '/api/photo/test_small.jpeg'},
                    //     {url: '/api/photo/test_big.jpeg'}
                    // ];
                    //
                    // mObserver.observe(vm.items);
                }
                TestController.$inject = ['$scope', course_resource_1.CourseResourceName, 'pgCalendarData', '$sce', '$rootScope', '$compile'];
                TestController.componentName = 'TestController';
                return TestController;
            }());
            exports_1("TestController", TestController);
        }
    }
});
//# sourceMappingURL=test.controller.js.map