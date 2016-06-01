import {IConstants} from "../core/core.config";

export interface IModel extends ng.resource.IResource<IModel>, pg.models.IModel{}

export interface IModelResource extends ng.resource.IResourceClass<IModel>{}

export let ModelResourceName = 'ModelResource';

ModelResource.$inject = ['$resource', 'constants'];
export function ModelResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IModelResource>$resource(`${constants.apiUrl}/model/:id`, {id: '@_id'});
}