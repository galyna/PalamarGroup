import 'angular';
import 'angular-route';

import {salonRoutes} from "./salon.routes";
import {MastersComponentName, MastersComponentOptions} from "./components/masters.component";
import {MasterComponentOptions, MasterComponentName} from "./components/master.component";
import {FavorsComponentName, FavorsComponentOptions} from "./components/favors.component";
import {FavorComponentName, FavorComponentOptions} from "./components/favor.component";
import {TransformComponentName, TransformComponentOptions} from "./components/transform.component";
import {TransformsComponentName, TransformsComponentOptions} from "./components/transforms.component";
import {BrendComponentName, BrendComponentOptions} from "./components/brend.component";
import {BrendsComponentName, BrendsComponentOptions} from "./components/brends.component";
import {ProductComponentName, ProductComponentOptions} from "./components/product.component";
import {ProductsComponentName, ProductsComponentOptions} from "./components/products.component";
import {MasterSchedulerComponentName, MasterSchedulerComponentOptions} from "./components/master.scheduler";
import {AppointmentsComponentName, AppointmentsComponentOptions} from "./components/appointments.component";
import {
    AppointmentSchedulerComponentName,
    AppointmentSchedulerComponentOptions
} from "./components/appointment.scheduler.component"
import {ProductOrdersComponentName, ProductOrdersComponentOptions} from "./components/product.orders.component";
import {SalonContactComponentOptions, SalonContactComponentName} from "./components/contact.component";
import {SalonContactsComponentOptions, SalonContactsComponentName} from "./components/contacts.component";
import {SalonComponentOptions, SalonComponentName} from "./components/salon.component";
import {SalonsComponentOptions, SalonsComponentName} from "./components/salons.component";

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
    .component( BrendComponentName, BrendComponentOptions )
    .component( BrendsComponentName, BrendsComponentOptions )
    .component( ProductComponentName, ProductComponentOptions )
    .component( ProductsComponentName, ProductsComponentOptions )
    .component( MasterSchedulerComponentName, MasterSchedulerComponentOptions )
    .component( AppointmentSchedulerComponentName, AppointmentSchedulerComponentOptions )
    .component( AppointmentsComponentName, AppointmentsComponentOptions )
    .component( ProductOrdersComponentName, ProductOrdersComponentOptions )
    .component( SalonContactsComponentName, SalonContactsComponentOptions )
    .component( SalonContactComponentName, SalonContactComponentOptions )
    .component( SalonsComponentName, SalonsComponentOptions )
    .component( SalonComponentName, SalonComponentOptions );
