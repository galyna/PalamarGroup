import 'angular';
import 'angular-sanitize';
import 'angular-material';
import {pgCalendarDirective} from './calendar.directive';
import {PgCalendarFactory} from "./calendar.factory";
import {PgCalendarData} from "./calendar.data.service";

export let pgCalendarModule = angular.module('pgCalendar', ["ngMaterial", "ngSanitize"])
    .service('pgCalendar', PgCalendarFactory)
    .service('pgCalendarData', PgCalendarData)
    .directive('pgCalendar', pgCalendarDirective);