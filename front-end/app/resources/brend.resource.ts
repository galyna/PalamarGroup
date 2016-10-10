/**
 * Created by Galyna on 10.10.2016.
 */
/**
 * Created by Galyna on 02.10.2016.
 */
import {IConstants} from "../core/core.config";

export interface IBrend extends ng.resource.IResource<IBrend>, pg.models.IBrend{}

export interface IBrendResource extends ng.resource.IResourceClass<IBrend>{}

export let BrendResourceName = 'BrendResource';

BrendResource.$inject = ['$resource', 'constants'];
export function BrendResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IBrendResource>$resource(`${constants.apiUrl}/brend/:id`, {id: '@_id'});
}

