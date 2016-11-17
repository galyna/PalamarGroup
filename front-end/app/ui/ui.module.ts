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
import {MenuComponentName, MenuComponentOptions} from "./menu";
import {FooterComponentName, FooterComponentOptions} from "./footer.component";
import {SchedulerServiceName, SchedulerService} from "./scheduler.service";
import {SalonHeaderComponentName, SalonHeaderComponentOptions} from "./header.component";

export let uiModule = angular.module('ui', [
    'youtube-embed',
    pgCalendarModule.name
])
    .factory(MediaObserverFactoryName, MediaObserverFactory)
    .service(PagingServiceName, PagingService)
    .service(SchedulerServiceName, SchedulerService)
    .component(adminPagingComponentName, adminPagingComponentOptions)
    .filter(courseDatesFilterName, courseDatesFilter)
    .directive(chooseFileButtonDirectiveName, chooseFileButtonDirectiveFactory)
    .component(MenuComponentName, MenuComponentOptions)
    .component(FooterComponentName, FooterComponentOptions)
    .component(SalonHeaderComponentName, SalonHeaderComponentOptions)
    .directive(ImageInputDirectiveName, imageInputDirectiveFactory);