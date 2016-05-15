/**
 * Created by Galyna on 16.03.2016.
 */
//modules
import 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'ng-file-upload';
import {uiModule} from './ui/ui.module';
import {usersModule} from './users/users.module';
import {adminModule} from './admin/admin.module';
import {coursesModule} from './courses/courses.module';
import './templates';

//components
import {httpInterceptorConfig} from './app.interceptor';
import {routesConfig} from './app.routes';
import {appConstants, appConfig, materialConfig} from './app.config';
import {appRun} from './app.run';

let app = angular.module('yuliaPalamarApp', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'ngFileUpload',

    'templates',
    uiModule.name,
    usersModule.name,
    adminModule.name,
    coursesModule.name
])
    .config(httpInterceptorConfig)
    .config(routesConfig)
    .config(appConfig)
    .config(materialConfig)

    .constant('constants', appConstants)

    .run(appRun);

export var appModule = app;
