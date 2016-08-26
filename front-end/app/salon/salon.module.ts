/**
 * Created by Galyna on 25.08.2016.
 */

//modules
import 'angular';
import 'angular-material';
import {resourcesModule} from "../resources/resources.module";

//components
import {salonRoutes} from './salon.routes';
import {SalonHomeComponentName,SalonHomeComponentOptions} from "./components/salon.home.component";


let app = angular.module('courses', [ 'ngMaterial', resourcesModule.name])
    .config(salonRoutes)
    .component(SalonHomeComponentName,SalonHomeComponentOptions );
export let coursesModule = app;


