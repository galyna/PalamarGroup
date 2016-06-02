import {adminModule} from "../../../../app/admin/admin.module";
import {
    AcademyDeliveryController,
    IEditSalonModel
} from "../../../../app/admin/academy/controllers/delivery.controller";
import {
    ISalonClientResource, SalonClientResourceName,
    ISalonClient
} from "../../../../app/resources/salon.client.resource";

fdescribe(`${adminModule.name} module`, () => {
    describe(AcademyDeliveryController.componentName, () => {
        let $controller: ng.IControllerService,
            $q: ng.IQService,
            $rootScope: ng.IRootScopeService,
            SalonClientResource: ISalonClientResource;
        
        beforeEach(angular.mock.module(adminModule.name));
        
        beforeEach(inject(($injector) => {
            $controller = $injector.get('$controller');
            $q = $injector.get("$q");
            $rootScope = $injector.get("$rootScope");
            SalonClientResource = $injector.get(SalonClientResourceName);
        }));

        function getDeliveryController($scope?){
            return <AcademyDeliveryController>$controller(AcademyDeliveryController.componentName, $scope);
        }

        it("should query salonClients during init", () => {
            let spy = spyOn(SalonClientResource, 'query');
            
            getDeliveryController();

            expect(spy).toHaveBeenCalled();
        });

        describe("createSalon method", () => {
            it("should call newSalonModel.$save() if form is valid", () => {
                let salonClientResource = new SalonClientResource();
                let spy = spyOn(salonClientResource, '$save').and.returnValue($q.resolve());
                let controller = getDeliveryController();
                let formMock = {$valid: true};

                controller.createSalon(<ng.IFormController>formMock, salonClientResource);

                expect(spy).toHaveBeenCalled();
            });
            it("should not call newSalonModel.$save() if form is not valid", () => {
                let salonClientResource = new SalonClientResource();
                let spy = spyOn(salonClientResource, '$save');
                let controller = getDeliveryController();
                let formMock = {$valid: false};

                controller.createSalon(<ng.IFormController>formMock, salonClientResource);

                expect(spy).not.toHaveBeenCalled();
            });
            it("should push created salon to this.salons on success", () => {
                let salonClientResource = new SalonClientResource();
                spyOn(SalonClientResource, 'query').and.returnValue([]);
                spyOn(salonClientResource, '$save').and.returnValue($q.resolve(salonClientResource));
                let controller = getDeliveryController();
                let formMock = {$valid: true};

                controller.createSalon(<ng.IFormController>formMock, salonClientResource);
                $rootScope.$digest();

                expect(controller.salons[controller.salons.length-1]).toBe(salonClientResource);
            });
        });
        
        fdescribe("editSalon method", () => {
            it("should call editSalonModel.$save() if form is valid", () => {
                let salonClientResource = new SalonClientResource({_id: "someid"});
                let spy = spyOn(salonClientResource, '$save').and.returnValue($q.resolve());
                let controller = getDeliveryController();
                let formMock = {$valid: true};

                controller.editSalon(<ng.IFormController>formMock, salonClientResource);

                expect(spy).toHaveBeenCalled();
            });
            it("should not call editSalonModel.$save() if form is not valid", () => {
                let salonClientResource = new SalonClientResource({_id: "someid"});
                let spy = spyOn(salonClientResource, '$save');
                let controller = getDeliveryController();
                let formMock = {$valid: false};

                controller.editSalon(<ng.IFormController>formMock, salonClientResource);

                expect(spy).not.toHaveBeenCalled();
            });
            it("should update edited salon in this.salons on success", () => {
                let salonClientResource = new SalonClientResource({_id: "someid", name: "before edit"});
                let editSalon = <IEditSalonModel>angular.copy(salonClientResource);
                editSalon.oldIndex = 0;
                editSalon.name = "after edit";
                spyOn(editSalon, '$save').and.returnValue($q.resolve(editSalon));
                spyOn(SalonClientResource, 'query').and.returnValue([salonClientResource]);
                let controller = getDeliveryController();
                $rootScope.$digest();
                let formMock = {$valid: true};

                controller.editSalon(<ng.IFormController>formMock, editSalon);
                $rootScope.$digest();

                expect(controller.salons[0].name).toBe(editSalon.name);
            });
        });
        
    });
});