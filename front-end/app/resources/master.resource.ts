import {IConstants} from "../core/core.config";

export interface IMaster extends ng.resource.IResource<IMaster>, pg.models.IMaster {
}

export interface IMasterResource extends ng.resource.IResourceClass<IMaster> {
}

export let MasterResourceName = 'MasterResource';

MasterResource.$inject = ['$resource', 'constants'];
export function MasterResource($resource:ng.resource.IResourceService, constants:IConstants) {
    return <IMasterResource>$resource(`${constants.apiUrl}/master/:id`, {id: '@_id'});
}