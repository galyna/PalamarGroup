import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;

export interface ISalonClient extends ng.resource.IResource<ISalonClient>, pg.models.ISalonClient{}

export interface ISalonClientResource extends ng.resource.IResourceClass<ISalonClient>{
    getGroups(): string[];
}

export let SalonClientResourceName = 'SalonClientResource';

SalonClientResource.$inject = ['$resource', 'constants'];
export function SalonClientResource($resource: ng.resource.IResourceService, constants: IConstants){
    let getGroupsDescriptor: IActionDescriptor = {
        method: "GET",
        params: {distinct : "group"},
        isArray: true
    };

    return <ISalonClientResource>$resource(`${constants.apiUrl}/salonclient/:id`, {id: '@_id'},
        {
            getGroups: getGroupsDescriptor
        });
}