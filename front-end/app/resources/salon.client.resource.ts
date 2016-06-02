import {IConstants} from "../core/core.config";

export interface ISalonClient extends ng.resource.IResource<ISalonClient>, pg.models.ISalonClient{}

export interface ISalonClientResource extends ng.resource.IResourceClass<ISalonClient>{}

export let SalonClientResourceName = 'SalonClientResource';

SalonClientResource.$inject = ['$resource', 'constants'];
export function SalonClientResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ISalonClientResource>$resource(`${constants.apiUrl}/salonclient/:id`, {id: '@_id'});
}