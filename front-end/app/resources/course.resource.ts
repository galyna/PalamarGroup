import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;
import IComment = pg.models.IComment;


export interface ICourse extends ng.resource.IResource<ICourse>, pg.models.ICourse {

}

export interface ICourseResource extends ng.resource.IResourceClass<ICourse> {
    addComment({id:string}, comment:any):ICourse;
    editComment({id:string}, comment:any):ICourse;
    deleteComment({id:string, commentId:string}):ICourse;
    getComments():[any];
}

export let CourseResourceName = 'CourseResource';

CourseResource.$inject = ['$resource', 'constants'];
export function CourseResource($resource:ng.resource.IResourceService, constants:IConstants) {
    let addCommentDescriptor:IActionDescriptor = {
        method: "POST",
        url: `${constants.apiUrl}/course/:id/comment`
    };
    let editCommentDescriptor:IActionDescriptor = {
        method: "PUT",
        url: `${constants.apiUrl}/course/:id/comment`
    };
    let deleteCommentDescriptor:IActionDescriptor = {
        method: "DELETE",
        params: {id: '@id', commentId: '@commentId'},
        url: `${constants.apiUrl}/course/:id/comment/:commentId`
    };
    let getCommentsDescriptor:IActionDescriptor = {
        method: "GET",
        isArray: true,
        url: `${constants.apiUrl}/course/comments`,

    };
    return <ICourseResource>$resource( `${constants.apiUrl}/course/:id`, {id: '@_id'},
        {
            addComment: addCommentDescriptor,
            getComments: getCommentsDescriptor,
            deleteComment: deleteCommentDescriptor,
            editComment: editCommentDescriptor
        } );
}