/**
 * Created by Galyna on 12.10.2016.
 */
/**
 * Created by Galyna on 10.10.2016.
 */

import {IConstants} from "../core/core.config";

export interface ISalon extends ng.resource.IResource<ISalon>, pg.models.ISalon{}

export interface ISalonResource extends ng.resource.IResourceClass<ISalon>{}

export let SalonResourceName = 'SalonResource';

SalonResource.$inject = ['$resource', 'constants'];
export function SalonResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ISalonResource>$resource(`${constants.apiUrl}/salon/:id`, {id: '@_id'});
}


