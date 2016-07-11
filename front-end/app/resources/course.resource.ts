import {IConstants} from "../core/core.config";
import IActionDescriptor = angular.resource.IActionDescriptor;
import IComment = pg.models.IComment;


export interface ICourse extends ng.resource.IResource<ICourse>, pg.models.ICourse {
    courseModulesDates: Date[]
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
                course.courseModulesDates = course.courseModulesDates.map((dateStr) => {
                    return new Date(dateStr);
                });
                return <ICourse>course;
            });
            return courses;
        }
    };
    let getDescriptor:IActionDescriptor = {
        method: "GET",
        transformResponse: (data) => {
            let course = <pg.models.ICourse>JSON.parse(data);
            course.courseModulesDates = course.courseModulesDates.map((dateStr) => {
                return new Date(dateStr);
            });
            return <ICourse>course;
        }
    };
    let saveDescriptor:IActionDescriptor = {
        method: "POST",
        transformResponse: (data) => {
            let course = <pg.models.ICourse>JSON.parse(data);
            course.courseModulesDates = course.courseModulesDates.map((dateStr) => {
                return new Date(dateStr);
            });
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