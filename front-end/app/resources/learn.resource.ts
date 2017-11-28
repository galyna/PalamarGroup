import {IConstants} from "../core/core.config";

export interface ILearn extends ng.resource.IResource<ILearn>, pg.models.ILearn{}

export interface ILearnResource extends ng.resource.IResourceClass<ILearn>{}

export let LearnResourceName = 'LearnResource';

LearnResource.$inject = ['$resource', 'constants'];
export function LearnResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ILearnResource>$resource(`${constants.apiUrl}/learn/:id`, {id: '@_id'});
}


