import {IConstants} from "../core/core.config";

export interface IComment extends ng.resource.IResource<IComment>, pg.models.IComment{}

export interface ICommentResource extends ng.resource.IResourceClass<IComment>{}

export let CommentResourceName = 'CommentResource';

CommentResource.$inject = ['$resource', 'constants'];
export function CommentResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <ICommentResource>$resource(`${constants.apiUrl}/course/:id`, {id: '@_id'});
}