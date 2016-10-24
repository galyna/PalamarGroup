import {IRootScope} from "../typings";
/**
 * Created by Galyna on 16.03.2016.
 */

materialConfig.$inject = ['uiGmapGoogleMapApiProvider'];
export function materialConfig(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure( {
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    } );

}
