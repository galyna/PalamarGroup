import 'angular';
import 'angular-route';

import {salonRoutes} from "./salon.routes";
import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {MasterComponentOptions, MasterComponentName} from "./components/master.component";
import {FavorsComponentName, FavorsComponentOptions} from "./components/favors.component";
import {FavorComponentName, FavorComponentOptions} from "./components/favor.component";
import {TransformComponentName, TransformComponentOptions} from "./components/transform.component";
import {TransformsComponentName, TransformsComponentOptions} from "./components/transforms.component";
import {MasterScedulerComponentName, MasterScedulerComponentOptions} from "./components/master.sceduler";

export let salonModule = angular.module( 'salon', [
    'ngRoute'
] )
    .config( salonRoutes )
    .component( MastersComponentName, MastersComponentOptions )
    .component( MasterComponentName, MasterComponentOptions )
    .component( FavorComponentName, FavorComponentOptions )
    .component( FavorsComponentName, FavorsComponentOptions )
    .component( TransformComponentName, TransformComponentOptions )
    .component( TransformsComponentName, TransformsComponentOptions )
    .component( MasterScedulerComponentName, MasterScedulerComponentOptions );
