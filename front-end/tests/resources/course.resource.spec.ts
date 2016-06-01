import 'angular';
import 'angular-mocks';
import {ICourseResource, CourseResourceName} from "../../app/resources/course.resource";
import {resourcesModule} from "../../app/resources/resources.module";
import {coreModule} from "../../app/core/core.module";

//this tests are just to familiarize with $resource service. No need to replicate it on other resources
describe(`${resourcesModule.name} module`, () => {
    describe(CourseResourceName, () => {
        let CourseResource: ICourseResource,
            $httpBackend: ng.IHttpBackendService;

        beforeEach(angular.mock.module(coreModule.name));
        beforeEach(angular.mock.module(resourcesModule.name));
        beforeEach(inject(($injector)=> {
            $httpBackend = $injector.get('$httpBackend');
            CourseResource = $injector.get(CourseResourceName);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('testing query method', () => {
            $httpBackend.whenGET('/api/course').respond([]);
            $httpBackend.expectGET('/api/course');
            CourseResource.query();
            $httpBackend.flush();
        });

        it('testing get method', () => {
            $httpBackend.whenGET('/api/course/someid').respond({});
            $httpBackend.expectGET('/api/course/someid');
            CourseResource.get({id: 'someid'});
            $httpBackend.flush();
        });

        it('testing $save method without id (aka create)', () => {
            $httpBackend.whenPOST('/api/course').respond({});
            $httpBackend.expectPOST('/api/course');
            let courseRes = new CourseResource({name: 'somename'});
            courseRes.$save();
            $httpBackend.flush();
        });

        it('testing $save method with id (aka update)', () => {
            $httpBackend.whenPOST('/api/course/someid').respond({});
            $httpBackend.expectPOST('/api/course/someid');
            let courseRes = new CourseResource({_id: 'someid'});
            courseRes.$save();
            $httpBackend.flush();
        });

        it('testing $delete method', () => {
            $httpBackend.whenDELETE('/api/course/someid').respond({});
            $httpBackend.expectDELETE('/api/course/someid');
            let courseRes = new CourseResource({_id: 'someid'});
            courseRes.$delete();
            $httpBackend.flush();
        });
    });
});