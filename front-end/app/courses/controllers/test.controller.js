System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestController;
    return {
        setters:[],
        execute: function() {
            TestController = (function () {
                function TestController($scope, courseService, pgCalendarData, $sce, $rootScope, $compile) {
                    var _this = this;
                    this.pgCalendarData = pgCalendarData;
                    courseService.get().then(function (courses) {
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
                TestController.$inject = ['$scope', 'courseService', 'pgCalendarData', '$sce', '$rootScope', '$compile'];
                TestController.componentName = 'TestController';
                return TestController;
            }());
            exports_1("TestController", TestController);
        }
    }
});
//# sourceMappingURL=test.controller.js.map