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
import {courseDatesFilterName, courseDatesFilter} from "./course.dates.filter";

export let uiModule = angular.module('ui', [
    'youtube-embed',
    pgCalendarModule.name
])
    .factory(MediaObserverFactoryName, MediaObserverFactory)
    .service(PagingServiceName, PagingService)
    .component(adminPagingComponentName, adminPagingComponentOptions)
    .filter(courseDatesFilterName, courseDatesFilter)
    .directive(chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory)
    .directive(ImageInputDirectiveName, imageInputDirectiveFactory);