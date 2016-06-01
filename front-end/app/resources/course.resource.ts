import {IConstants} from "../core/core.config";

export interface ICourse extends ng.resource.IResource<ICourse>, pg.models.ICourse{}

export interface ICourseResource extends ng.resource.IResourceClass<ICourse>{}

export let CourseResourceName = 'CourseResource';

CourseResource.$inject = ['$resource', 'constants'];
export function CourseResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ICourseResource>$resource(`${constants.apiUrl}/course/:id`, {id: '@_id'});
}