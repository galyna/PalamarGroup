//modules
import 'angular';
import {pgCalendarModule} from '../calendar/calendar.module';

//components
import {MediaObserverFactory, MediaObserverFactoryName} from "./mediaObserver.service";
import {chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory} from "./choose.file.button.directive";
import {
    adminPagingComponentName, adminPagingComponentOptions,
    PagingServiceName, PagingService
} from "./admin.paging";

export let uiModule = angular.module('ui', [pgCalendarModule.name])
    .factory(MediaObserverFactoryName, MediaObserverFactory)
    .directive(chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory)
    .service(PagingServiceName, PagingService)
    .component(adminPagingComponentName, adminPagingComponentOptions);