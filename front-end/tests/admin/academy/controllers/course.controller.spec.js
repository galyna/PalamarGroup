System.register(['angular', 'angular-mocks', 'app/app.module', "app/admin/academy/controllers/course.controller"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var course_controller_1;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (course_controller_1_1) {
                course_controller_1 = course_controller_1_1;
            }],
        execute: function() {
            describe(course_controller_1.AcademyCourseController.componentName, function () {
                beforeEach(angular.mock.module('admin'));
                var $controller, $httpBackend;
                beforeEach(inject(function (_$controller_, _$httpBackend_) {
                    $controller = _$controller_;
                    $httpBackend = _$httpBackend_;
                }));
                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });
                fit('should have some', function () {
                    $httpBackend.expectGET('api/course');
                    var controller = $controller(course_controller_1.AcademyCourseController.componentName, { $scope: {} });
                    $httpBackend.flush();
                });
            });
        }
    }
});
//# sourceMappingURL=course.controller.spec.js.map