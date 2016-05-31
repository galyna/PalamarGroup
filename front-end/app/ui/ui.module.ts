import {pgCalendarModule} from '../calendar/calendar.module';
import {MediaObserverFactory} from "./mediaObserver.service";
let app:angular.IModule = angular.module('ui', [pgCalendarModule.name])
    .factory('mediaObserver', MediaObserverFactory)
    .directive('chooseFileButton', function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var button = elem.find('button');
                var input = elem.find('input');
                input.css({display: 'none'});
                button.bind('click', function () {
                    input[0].click();
                });
            }
        };
    });
export let uiModule = app;