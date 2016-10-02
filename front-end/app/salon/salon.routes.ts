/**
 * Created by Galyna on 25.08.2016.
 */

import {SalonHomeComponentUrl} from "./components/salon.home.component";
import {FavorsComponentUrl} from "./components/favors.component";
import {IConstants} from "../core/core.config";
import {MasterComponentUrl} from "./components/master.compenent";

salonRoutes.$inject = ['$routeProvider', 'constants'];
export function salonRoutes($routeProvider:ng.route.IRouteProvider, constants:IConstants) {
    if (constants.showSalon) {
        $routeProvider
            .when( SalonHomeComponentUrl, {
                template: '<pg-salon-home></pg-salon-home>',
            } )
            .when( FavorsComponentUrl, {
                template: '<pg-favors></pg-favors>',
            } )
            .when( MasterComponentUrl, {
                template: '<pg-master></pg-master>',
            } )
        ;
    }

}