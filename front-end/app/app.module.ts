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
import 'ngSmoothScroll';
import 'aos';
import 'angular-youtube-embed';
import 'daypilot';
import {uiModule} from './ui/ui.module';
import {coursesModule} from './courses/courses.module';
import {salonModule} from './salon/salon.module';
import './templates';

//components
import {routesConfig} from './app.routes';
import {materialConfig} from './app.config';
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
   '720kb.socialshare',
    'smoothScroll',
    'templates',
    'youtube-embed',
    'daypilot',
   // 'uiGmapgoogle-maps',
    coreModule.name,
    resourcesModule.name,
    uiModule.name,
    coursesModule.name,
    salonModule.name

])
    .config(routesConfig)
    .config(materialConfig)
    .run(appRun);

export var appModule = app;
