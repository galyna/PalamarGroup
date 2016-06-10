/**
 * Created by Galyna on 14.05.2016.
 */
import {IComment, ICommentResource, CommentResourceName} from "../../../resources/comment.resource";

export class AcademyCommentController {

    static $inject = [CommentResourceName, '$log'];
    static componentName = 'AcademyCommentController';

    comments:IComment[];
    newComment:IComment;

    constructor(private CommentResource: ICommentResource, private $log:ng.ILogService) {
        this.comments = this.CommentResource.query();
        this.newComment= new CommentResource();
    }
    createComment(form:ng.IFormController):void {
        this.$log.debug("createComment ...$valid" + form.$valid);
        if (form.$valid) {
            this.newComment.$save()
                .then((comment)=> {
                    this.$log.debug("success createComment...");
                    this.comments.push(comment);
                })
                .catch((err)=> {
                    this.$log.debug("fail createComment..." + err);
                });
        }
    }

    deleteComment(comment: IComment):void {
        comment.$delete().then(()=> {
            this.comments.splice(this.comments.indexOf(comment), 1);
        });
    }

    //noinspection JSMethodCanBeStatic
    showComment(comment:IComment):void {
        comment.isVisible=true;
        comment.$save();
    }
    
    //noinspection JSMethodCanBeStatic
    answerComment(comment:IComment):void {
        comment.answered=true;
        comment.$save();
    }

}
