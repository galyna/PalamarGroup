/**
 * Created by Galyna on 02.10.2016.
 */
import {IConstants} from "../core/core.config";

export interface IProduct extends ng.resource.IResource<IProduct>, pg.models.IProduct{}

export interface IProductResource extends ng.resource.IResourceClass<IProduct>{}

export let ProductResourceName = 'ProductResource';

ProductResource.$inject = ['$resource', 'constants'];
export function ProductResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IProductResource>$resource(`${constants.apiUrl}/product/:id`, {id: '@_id'});
}
