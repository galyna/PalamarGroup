import 'angular';
import 'angular-route';

import {salonRoutes} from "./salon.routes";
import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {MasterComponentOptions, MasterComponentName} from "./components/master.component";
import {FavorsComponentName,FavorsComponentOptions} from "./components/favors.component";
import {FavorComponentName,FavorComponentOptions} from "./components/favor.component";

export let salonModule = angular.module( 'salon', [
    'ngRoute'
] )
    .config( salonRoutes )
    .component( MastersComponentName, MastersComponentOptions )
    .component( MasterComponentName, MasterComponentOptions )
    .component( FavorComponentName, FavorComponentOptions )
    .component( FavorsComponentName, FavorsComponentOptions );