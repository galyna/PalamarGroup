//modules
import 'angular';
import 'angular-youtube-embed';
import {pgCalendarModule} from '../calendar/calendar.module';

//components
import {MediaObserverFactory, MediaObserverFactoryName} from "./mediaObserver.service";
import {chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory} from "./choose.file.button.directive";
import {
    adminPagingComponentName, adminPagingComponentOptions,
    PagingServiceName, PagingService
} from "./admin.paging";
import {
    ImageInputDirectiveName, imageInputDirectiveFactory} from "./image.input.directive";

export let uiModule = angular.module('ui', [
    'youtube-embed',
    pgCalendarModule.name
])
    .factory(MediaObserverFactoryName, MediaObserverFactory)
    .directive(chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory)
    .service(PagingServiceName, PagingService)
    .component(adminPagingComponentName, adminPagingComponentOptions)
    .directive(ImageInputDirectiveName, imageInputDirectiveFactory);