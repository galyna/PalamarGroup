import {MastersComponentUrl} from "./components/masters.component";
import {ItServiceName, ItService} from "../../users/services/it.service";
import {MasterComponentUrl} from "./components/master.component";
import {FavorsComponentUrl} from "./components/favors.component";

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
        } );
}