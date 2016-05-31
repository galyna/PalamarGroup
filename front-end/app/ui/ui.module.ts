import 'angular';
import {pgCalendarModule} from '../calendar/calendar.module';
import {MediaObserverFactory} from "./mediaObserver.service";

let app = angular.module('ui', [pgCalendarModule.name])
    .factory('mediaObserver', MediaObserverFactory);

export let uiModule = app;