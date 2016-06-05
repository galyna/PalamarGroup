import {adminModule} from "../../../../app/admin/admin.module";
import {
    AcademyDeliveryController
} from "../../../../app/admin/academy/controllers/delivery.controller";
import {
    ISalonClientResource, SalonClientResourceName,
} from "../../../../app/resources/salon.client.resource";
import {ICourseResource, CourseResourceName} from "../../../../app/resources/course.resource";

describe(`${adminModule.name} module`, () => {
    describe(AcademyDeliveryController.componentName, () => {
        let $controller: ng.IControllerService,
            $q: ng.IQService,
            $rootScope: ng.IRootScopeService,
            SalonClientResource: ISalonClientResource,
            CourseResource: ICourseResource,
            controller: AcademyDeliveryController,
            salonsSpy, salonGroupsSpy, coursesSpy;
        
        beforeEach(angular.mock.module(adminModule.name));
        
        beforeEach(inject(($injector) => {
            $controller = $injector.get('$controller');
            $q = $injector.get("$q");
            $rootScope = $injector.get("$rootScope");
            SalonClientResource = $injector.get(SalonClientResourceName);
            CourseResource = $injector.get(CourseResourceName);
        }));

        beforeEach(() => {
            salonsSpy = spyOn(SalonClientResource, 'query').and.returnValue({$promise: $q.when()});
            salonGroupsSpy = spyOn(SalonClientResource, 'getGroups').and.returnValue({$promise: $q.when()});
            coursesSpy = spyOn(CourseResource, 'query').and.returnValue({$promise: $q.when()});
            controller = <AcademyDeliveryController>$controller(AcademyDeliveryController.componentName, $rootScope.$new());
            $rootScope.$digest();
        });

        it("should query salonClients during init", () => {
            expect(salonsSpy).toHaveBeenCalled();
        });

        describe("createSalon method", () => {
            it("should call newSalonModel.$save() if form is valid", () => {
                let salonClientResource = new SalonClientResource();
                let spy = spyOn(salonClientResource, '$save').and.returnValue($q.resolve());

                controller.createSalon(salonClientResource);

                expect(spy).toHaveBeenCalled();
            });

            it("should call this.initSalons() on success", () => {
                let salonClientResource = new SalonClientResource();
                spyOn(salonClientResource, '$save').and.returnValue($q.when(salonClientResource));
                let initSalonsSpy = spyOn(controller, 'initSalons');

                controller.createSalon(salonClientResource);
                $rootScope.$digest();

                expect(initSalonsSpy).toHaveBeenCalled();
            });
        });
        
        describe("editSalon method", () => {
            it("should call editSalonModel.$save()", () => {
                let salonClientResource = new SalonClientResource({_id: "someid"});
                let spy = spyOn(salonClientResource, '$save').and.returnValue($q.resolve());

                controller.editSalon(salonClientResource);

                expect(spy).toHaveBeenCalled();
            });

            it("should call this.initSalons() on success", () => {
                let salonClientResource = new SalonClientResource({_id: "someid", name: "before edit"});
                let editSalon = angular.copy(salonClientResource);
                editSalon.name = "after edit";
                spyOn(editSalon, '$save').and.returnValue($q.when(salonClientResource));


                controller.editSalon(editSalon);
                let initSalonsSpy = spyOn(controller, 'initSalons');
                $rootScope.$digest();

                expect(initSalonsSpy).toHaveBeenCalled();
            });
        });
        
        describe("initSalons", () => {
            it("should query salons and salongroups", () => {
                controller.initSalons();

                expect(salonsSpy).toHaveBeenCalled();
                expect(salonGroupsSpy).toHaveBeenCalled();
            });
        });
        
    });
});