/**
 * Created by Galyna on 25.08.2016.
 */

import {SalonHomeComponentUrl} from "./components/salon.home.component";
import {FavorsComponentUrl} from "../admin/salon/components/favors.component";

salonRoutes.$inject = ['$routeProvider'];
export function salonRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when(SalonHomeComponentUrl, {
            template: '<pg-salon-home></pg-salon-home>',
        })
        .when(FavorsComponentUrl, {
            template: '<pg-favors></pg-favors>',
        })
        ;
}