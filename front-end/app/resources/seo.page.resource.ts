
/**
 * Created by Galyna on 10.10.2016.
 */

import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;

export interface ISeoPage extends ng.resource.IResource<ISeoPage>, pg.models.ISeoPage{}

export interface ISeoPageResource extends ng.resource.IResourceClass<ISeoPage>{
    getSnapshots:ng.resource.IResourceArrayMethod<pg.models.ISeoPage>;
    getStubs:ng.resource.IResourceArrayMethod<pg.models.ISeoPage>;
}

export let SeoPageResourceName = 'SeoPageResource';

SeoPageResource.$inject = ['$resource', 'constants'];
export function SeoPageResource($resource: ng.resource.IResourceService, constants: IConstants){
    let getSnapshotsDescriptor:IActionDescriptor = {
        method: "GET",
        url: `${constants.apiUrl}/snapshots`,

    };
    let getStubsDescriptor:IActionDescriptor = {
        method: "GET",
        url: `${constants.apiUrl}/stubs`,

    };
    return <ISeoPageResource>$resource(`${constants.apiUrl}/seopage/:id`, {id: '@_id'},{
        getStubs: getStubsDescriptor,
        getSnapshots: getSnapshotsDescriptor
    });
}



