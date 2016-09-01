import 'angular';
import 'angular-route';

import {salonRoutes} from "./salon.routes";
import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {MasterComponentOptions, MasterComponentName} from "./components/master.component";
import {FavorsComponentName,FavorsComponentOptions} from "./components/favors.component";

export let salonModule = angular.module( 'salon', [
    'ngRoute'
] )
    .config( salonRoutes )
    .component( MastersComponentName, MastersComponentOptions )
    .component( MasterComponentName, MasterComponentOptions )
    .component( FavorsComponentName, FavorsComponentOptions );