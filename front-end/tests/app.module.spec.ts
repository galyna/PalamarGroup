import 'angular';
import {appModule} from "../app/app.module";

describe(`${appModule.name} module`, () => {
    beforeEach(angular.mock.module(appModule.name));

    it(`${appModule.name} must be instantiated without errors`, () => {
        let moduleInstance = angular.module(appModule.name);
        expect(moduleInstance).toBeDefined();
    });
});