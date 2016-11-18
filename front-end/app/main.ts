import 'angular';
import {appModule} from './app.module';

angular.element(document).ready(function () {
    angular.bootstrap(document.querySelector("html"), [appModule.name]);
});
