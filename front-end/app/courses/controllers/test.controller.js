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
                //noinspection JSUnusedLocalSymbols
                function TestController($scope, CourseResource, pgCalendarData, $sce, $rootScope, $compile) {
                    this.pgCalendarData = pgCalendarData;
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