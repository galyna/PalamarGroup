import {IConstants} from "../core/core.config";

export interface IContact extends ng.resource.IResource<IContact>, pg.models.IContact{}

export interface IContactResource extends ng.resource.IResourceClass<IContact>{}

export let ContactResourceName = 'ContactResource';

ContactResource.$inject = ['$resource', 'constants'];
export function ContactResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IContactResource>$resource(`${constants.apiUrl}/contact/:id`, {id: '@_id'});
}