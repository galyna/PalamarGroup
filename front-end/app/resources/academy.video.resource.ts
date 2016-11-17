/**
 * Created by Galyna on 17.11.2016.
 */
/**
 * Created by Galyna on 10.10.2016.
 */

import {IConstants} from "../core/core.config";

export interface IAcademyVideos extends ng.resource.IResource<IAcademyVideos>, pg.models.IAcademyVideos{}

export interface IAcademyVideosResource extends ng.resource.IResourceClass<IAcademyVideos>{}

export let AcademyVideosResourceName = 'AcademyVideosResource';

AcademyVideosResource.$inject = ['$resource', 'constants'];
export function AcademyVideosResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IAcademyVideosResource>$resource(`${constants.apiUrl}/academyvideos/:id`, {id: '@_id'});
}


