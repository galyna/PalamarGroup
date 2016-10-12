/**
 * Created by Galyna on 11.10.2016.
 */

import {IConstants} from "../core/core.config";

export interface IProductOrder extends ng.resource.IResource<IProductOrder>, pg.models.IProductOrder{}

export interface IProductOrderResource extends ng.resource.IResourceClass<IProductOrder>{}

export let ProductOrderResourceName = 'ProductOrderResource';

ProductOrderResource.$inject = ['$resource', 'constants'];
export function ProductOrderResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IProductOrderResource>$resource(`${constants.apiUrl}/productorder/:id`, {id: '@_id'});
}

