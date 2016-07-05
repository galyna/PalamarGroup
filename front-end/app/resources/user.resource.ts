import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;

export interface IUser extends ng.resource.IResource<IUser>, pg.models.IUser{
    $changePassword({password:string}):ng.IHttpPromise<void>;
}

export interface IUserResource extends ng.resource.IResourceClass<IUser>{}

export let UserResourceName = 'UserResource';

UserResource.$inject = ['$resource', 'constants'];
export function UserResource($resource: ng.resource.IResourceService, constants: IConstants){

    let changePasswordDescriptor:IActionDescriptor = {
        method: "POST",
        params: {id: '@_id', password: '@password'},
        url: `${constants.apiUrl}/user/:id/password`
    };

    return <IUserResource>$resource(`${constants.apiUrl}/user/:id`, {id: '@_id'},
        {
            changePassword: changePasswordDescriptor
        });
}