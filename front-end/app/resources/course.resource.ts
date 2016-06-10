import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;
import {IComment} from "./comment.resource";

export interface ICourse extends ng.resource.IResource<ICourse>, pg.models.ICourse{
    $addComment(comment: IComment): ng.IPromise<ICourse>;
}

export interface ICourseResource extends ng.resource.IResourceClass<ICourse>{
    addComment({id:string}, comment: IComment): ICourse;
}

export let CourseResourceName = 'CourseResource';

CourseResource.$inject = ['$resource', 'constants'];
export function CourseResource($resource: ng.resource.IResourceService, constants: IConstants){
    let addCommentDescriptor: IActionDescriptor = {
        method: "POST",
        url: `${constants.apiUrl}/course/:id/comment`
    };
    return <ICourseResource>$resource(`${constants.apiUrl}/course/:id`, {id: '@_id'},
        {
            addComment: addCommentDescriptor
        });
}