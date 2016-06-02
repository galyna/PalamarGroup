import {IConstants} from "../core/core.config";

export interface IOrder extends ng.resource.IResource<IOrder>, pg.models.IOrder{}

export interface IOrderResource extends ng.resource.IResourceClass<IOrder>{}

export let OrderResourceName = 'OrderResource';

OrderResource.$inject = ['$resource', 'constants'];
export function OrderResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IOrderResource>$resource(`${constants.apiUrl}/order/:id`, {id: '@_id'});
}