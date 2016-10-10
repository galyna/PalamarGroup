import {MastersComponentUrl} from "./components/masters.component";
import {ItServiceName, ItService} from "../../users/services/it.service";
import {MasterComponentUrl} from "./components/master.component";
import {FavorsComponentUrl} from "./components/favors.component";
import {FavorComponentUrl} from "./components/favor.component";
import {TransformComponentUrl} from "./components/transform.component";
import {TransformsComponentUrl} from "./components/transforms.component";
import {AppointmentsComponentUrl} from "./components/appointments.component";
import {BrendsComponentUrl} from "./components/brends.component";
import {BrendComponentUrl} from "./components/brend.component";
import {ProductComponentUrl} from "./components/product.component";
import {ProductsComponentUrl} from "./components/products.component";

salonRoutes.$inject = ['$routeProvider'];
export function salonRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when( MastersComponentUrl, {
            template: '<pg-masters></pg-masters>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( MasterComponentUrl, {
            template: '<pg-master></pg-master>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( FavorsComponentUrl, {
            template: '<pg-favors></pg-favors>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( FavorComponentUrl, {
            template: '<pg-favor></pg-favor>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( TransformComponentUrl, {
            template: '<pg-transform></pg-transform>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( TransformsComponentUrl, {
            template: '<pg-transforms></pg-transforms>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( BrendsComponentUrl, {
            template: '<pg-brends></pg-brends>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( BrendComponentUrl, {
            template: '<pg-brend></pg-brend>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( ProductsComponentUrl, {
            template: '<pg-products></pg-products>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( ProductComponentUrl, {
            template: '<pg-product></pg-product>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
        .when( AppointmentsComponentUrl, {
            template: '<pg-appointments></pg-appointments>',
            resolve: {
                auth: [ItServiceName, (it:ItService) => it.canAsync( 'readSalon' )]
            }
        } )
}