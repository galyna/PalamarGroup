import 'angular';
import {resourcesModule} from "../../app/resources/resources.module";

describe(`${resourcesModule.name} module`, () => {
    beforeEach(angular.mock.module(resourcesModule.name));

    it(`${resourcesModule.name} must be instantiated without errors`, () => {
        let moduleInstance = angular.module(resourcesModule.name);
        expect(moduleInstance).toBeDefined();
    });
});