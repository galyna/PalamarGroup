/**
 * Created by Galyna on 17.09.2016.
 */
import {IConstants} from "../core/core.config";

export interface ITransform extends ng.resource.IResource<ITransform>, pg.models.ITransform{}

export interface ITransformResource extends ng.resource.IResourceClass<ITransform>{}

export let TransformResourceName = 'TransformResource';

TransformResource.$inject = ['$resource', 'constants'];
export function TransformResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ITransformResource>$resource(`${constants.apiUrl}/model/:id`, {id: '@_id'});
}
