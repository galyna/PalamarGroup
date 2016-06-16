/**
 * Created by Galyna on 16.03.2016.
 */
//modules
import 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-animate';
import 'ng-file-upload';
import 'ng-img-crop-full-extended';
import 'angular-socialshare';
import {uiModule} from './ui/ui.module';
import {usersModule} from './users/users.module';
import {adminModule} from './admin/admin.module';
import {coursesModule} from './courses/courses.module';
import './templates';

//components
import {routesConfig} from './app.routes';
import {appConfig, materialConfig} from './app.config';
import {appRun} from './app.run';
import {resourcesModule} from "./resources/resources.module";
import {coreModule} from "./core/core.module";

let app = angular.module('yuliaPalamarApp', [
    'ngResource',
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'ngFileUpload',
    'ngImgCrop',
    'templates',
    '720kb.socialshare',
    coreModule.name,
    resourcesModule.name,
    uiModule.name,
    usersModule.name,
    adminModule.name,
    coursesModule.name
])
    .config(routesConfig)
    .config(appConfig)
    .config(materialConfig)
    .run(appRun);

export var appModule = app;
