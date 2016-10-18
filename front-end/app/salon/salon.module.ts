/**
 * Created by Galyna on 25.08.2016.
 */

//modules
import 'angular';
import 'angular-material';
import {resourcesModule} from "../resources/resources.module";

//components
import {salonRoutes} from './salon.routes';
import {SalonHomeComponentName, SalonHomeComponentOptions} from "./components/salon.home.component";
import {FavorsComponentName, FavorsComponentOptions} from "./components/favors.component";
import {MasterComponentName, MasterComponentOptions} from "./components/master.compenent";
import {ProductsComponentOptions, ProductsComponentName} from "./components/products.component";
import {SalonContactsComponentOptions, SalonContactsComponentName} from "./components/salon.contacts.component";
import {SalonTransformsComponentName, SalonTransformsComponentOptions} from "./components/salon.transforms.component";


let app = angular.module( 'salon', ['ngMaterial', resourcesModule.name] )
    .config( salonRoutes )
    .component( SalonHomeComponentName, SalonHomeComponentOptions )
    .component( FavorsComponentName, FavorsComponentOptions )
    .component( MasterComponentName, MasterComponentOptions )
    .component( SalonContactsComponentName, SalonContactsComponentOptions )
    .component( ProductsComponentName, ProductsComponentOptions )
    .component( SalonTransformsComponentName, SalonTransformsComponentOptions );
export let salonModule = app;


