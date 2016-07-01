import {IConstants} from "../core/core.config";

export interface IUser extends ng.resource.IResource<IUser>, pg.models.IUser{}

export interface IUserResource extends ng.resource.IResourceClass<IUser>{}

export let UserResourceName = 'UserResource';

UserResource.$inject = ['$resource', 'constants'];
export function UserResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IUserResource>$resource(`${constants.apiUrl}/user/:id`, {id: '@_id'});
}