import 'angular';
import 'angular-route';

import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {MasterComponentOptions, MasterComponentName} from "./components/master.component";
import {salonRoutes} from "./salon.routes";

export let salonModule = angular.module('salon', [
    'ngRoute'
])
    .config(salonRoutes)
    .component(MastersComponentName, MastersComponentOptions)
    .component(MasterComponentName, MasterComponentOptions);