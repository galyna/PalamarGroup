import {coreModule} from "../../app/core/core.module";

describe(`${coreModule.name} module`, () => {
    it(`${coreModule.name} must be instantiated without errors`, () => {
        let moduleInstance = angular.module(coreModule.name);
        expect(moduleInstance).toBeDefined();
    });
});