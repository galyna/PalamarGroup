System.register(['../calendar/calendar.module', "./mediaObserver.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var calendar_module_1, mediaObserver_service_1;
    var app, uiModule;
    return {
        setters:[
            function (calendar_module_1_1) {
                calendar_module_1 = calendar_module_1_1;
            },
            function (mediaObserver_service_1_1) {
                mediaObserver_service_1 = mediaObserver_service_1_1;
            }],
        execute: function() {
            app = angular.module('ui', [calendar_module_1.pgCalendarModule.name])
                .factory('mediaObserver', mediaObserver_service_1.MediaObserverFactory);
            exports_1("uiModule", uiModule = app);
        }
    }
});
//# sourceMappingURL=ui.module.js.map