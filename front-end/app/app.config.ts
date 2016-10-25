import {IRootScope} from "../typings";
/**
 * Created by Galyna on 16.03.2016.
 */

materialConfig.$inject = ['uiGmapGoogleMapApiProvider'];
export function materialConfig(uiGmapGoogleMapApiProvider) {


    uiGmapGoogleMapApiProvider.configure( {
        key: 'AIzaSyCIta-syyAj-btYL9IMx5262_LCEC_U0No',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    } );

}
