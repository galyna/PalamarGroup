import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;
import IComment = pg.models.IComment;


export interface ICourse extends ng.resource.IResource<ICourse>, pg.models.ICourse {

}

export interface IAdminComment extends pg.models.IAdminComment {
    date: Date,
    courseDates: Date[]
}

export interface ICourseResource extends ng.resource.IResourceClass<ICourse> {
    addComment(params: {id:string}, comment:any):ICourse;
    editComment(params: {id:string}, comment:any):ICourse;
    deleteComment(params: {id: string, commentId: string}):ICourse;
    getComments:ng.resource.IResourceArrayMethod<pg.models.IAdminComment>;
}

export let CourseResourceName = 'CourseResource';

CourseResource.$inject = ['$resource', 'constants'];
export function CourseResource($resource:ng.resource.IResourceService, constants:IConstants) {
    let queryDescriptor:IActionDescriptor = {
        method: "GET",
        isArray: true,
        transformResponse: (data) => {
            let courses = <pg.models.ICourse[]>JSON.parse(data);
            courses.map((course) => {

                return <ICourse>course;
            });
            return courses;
        }
    };
    let getDescriptor:IActionDescriptor = {
        method: "GET",
        transformResponse: (data) => {
            let course = <pg.models.ICourse>JSON.parse(data);

            return <ICourse>course;
        }
    };
    let saveDescriptor:IActionDescriptor = {
        method: "POST",
        transformResponse: (data) => {
            let course = <pg.models.ICourse>JSON.parse(data);

            return <ICourse>course;
        }
    };
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
        transformResponse: (data) => {
            let comments = <pg.models.IAdminComment[]>JSON.parse(data);
            comments.forEach((comment)=>{
                comment.date = new Date(comment.date);
                
            });
            return <IAdminComment[]>comments;
        }
    };
    
    
    return <ICourseResource>$resource(`${constants.apiUrl}/course/:id`, {id: '@_id'},
        {
            query: queryDescriptor,
            get: getDescriptor,
            save: saveDescriptor,
            addComment: addCommentDescriptor,
            getComments: getCommentsDescriptor,
            deleteComment: deleteCommentDescriptor,
            editComment: editCommentDescriptor
        });
}