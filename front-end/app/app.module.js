System.register(['./ui/ui.module', './users/users.module', './admin/admin.module', './courses/courses.module', './app.interceptor', './app.routes', './app.config', './app.run'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ui_module_1, users_module_1, admin_module_1, courses_module_1, app_interceptor_1, app_routes_1, app_config_1, app_run_1;
    var templatesModule, app, appModule;
    return {
        setters:[
            function (ui_module_1_1) {
                ui_module_1 = ui_module_1_1;
            },
            function (users_module_1_1) {
                users_module_1 = users_module_1_1;
            },
            function (admin_module_1_1) {
                admin_module_1 = admin_module_1_1;
            },
            function (courses_module_1_1) {
                courses_module_1 = courses_module_1_1;
            },
            function (app_interceptor_1_1) {
                app_interceptor_1 = app_interceptor_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (app_run_1_1) {
                app_run_1 = app_run_1_1;
            }],
        execute: function() {
            templatesModule = angular.module("templates", []);
            app = angular.module('yuliaPalamarApp', [
                'ngMaterial',
                'ngMessages',
                'ngRoute',
                'ngFileUpload',
                ui_module_1.uiModule.name,
                users_module_1.usersModule.name,
                templatesModule.name,
                admin_module_1.adminModule.name,
                courses_module_1.coursesModule.name
            ])
                .config(app_interceptor_1.httpInterceptorConfig)
                .config(app_routes_1.routesConfig)
                .config(app_config_1.appConfig)
                .config(app_config_1.materialConfig)
                .constant('constants', app_config_1.appConstants)
                .run(app_run_1.appRun);
            exports_1("appModule", appModule = app);
        }
    }
});
//# sourceMappingURL=app.module.js.map