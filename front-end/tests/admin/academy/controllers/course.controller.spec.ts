import 'angular';
import 'angular-mocks';
import 'app/app.module';
import {AcademyCourseController} from "app/admin/academy/controllers/course.controller";

describe(AcademyCourseController.componentName, () => {
    beforeEach(angular.mock.module('admin'));

    let $controller: ng.IControllerService, $httpBackend: angular.IHttpBackendService;

    beforeEach(inject(function(_$controller_, _$httpBackend_){
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    fit('should have some', () => {
        $httpBackend.expectGET('api/course');
        let controller = $controller(AcademyCourseController.componentName, { $scope: {} });
        $httpBackend.flush();
    })
});