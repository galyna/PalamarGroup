import 'angular';
import {adminModule} from './admin/admin.module';

angular.element(document).ready(function () {
    angular.bootstrap(document.body, [adminModule.name]);
});