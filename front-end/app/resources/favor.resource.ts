/**
 * Created by Galyna on 01.09.2016.
 */
import {IConstants} from "../core/core.config";

export interface IFavor extends ng.resource.IResource<IFavor>, pg.models.IFavor {
}

export interface IFavorResource extends ng.resource.IResourceClass<IFavor> {
}

export let FavorResourceName = 'FavorResource';

FavorResource.$inject = ['$resource', 'constants'];
export function FavorResource($resource:ng.resource.IResourceService, constants:IConstants) {
    return <IFavorResource>$resource(`${constants.apiUrl}/favor/:id`, {id: '@_id'});
}

