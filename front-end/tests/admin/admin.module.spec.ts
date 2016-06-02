import 'angular';
import {adminModule} from "../../app/admin/admin.module";

describe(`${adminModule.name} module`, () => {
    beforeEach(angular.mock.module(adminModule.name));

    it(`${adminModule.name} must be instantiated without errors`, () => {
        let moduleInstance = angular.module(adminModule.name);
        expect(moduleInstance).toBeDefined();
    });
});