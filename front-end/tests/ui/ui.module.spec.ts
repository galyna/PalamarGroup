import 'angular';
import {uiModule} from "../../app/ui/ui.module";

describe(`${uiModule.name} module`, () => {
    beforeEach(angular.mock.module(uiModule.name));

    it(`${uiModule.name} must be instantiated without errors`, () => {
        let moduleInstance = angular.module(uiModule.name);
        expect(moduleInstance).toBeDefined();
    });
});