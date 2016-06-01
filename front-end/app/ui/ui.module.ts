import 'angular';
import {pgCalendarModule} from '../calendar/calendar.module';
import {MediaObserverFactory, MediaObserverFactoryName} from "./mediaObserver.service";
export let uiModule = angular.module('ui', [pgCalendarModule.name])
    .factory(MediaObserverFactoryName, MediaObserverFactory)
    //TODO: extract to separate file
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