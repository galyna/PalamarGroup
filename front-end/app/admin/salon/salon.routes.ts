import {MastersComponentUrl} from "./components/masters.component";
import {ItServiceName, ItService} from "../../users/services/it.service";
import {MasterComponentUrl} from "./components/master.component";
import {FavorsComponentUrl} from "./components/favors.component";
import {FavorComponentUrl} from "./components/favor.component";
import {TransformComponentUrl} from "./components/transform.component";
import {TransformsComponentUrl} from "./components/transforms.component";

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
}