/**
 * Created by Galyna on 14.05.2016.
 */
import {ICommentService} from "../services/comment.service";
import IComment = pg.models.IComment;

export class AcademyCommentController {

    static $inject = ['orderService', '$log'];
    static componentName = 'AcademyCommentController';

    comments:IComment[];
    newComment:IComment;

    constructor(private commentService:ICommentService, private $log:ng.ILogService) {
        this.commentService.get().then((comments) => {
            this.comments = comments;
            
        })

    }
    createCourse(form:ng.IFormController):void {
        this.$log.debug("createCourse ...$valid" + form.$valid);
        if (form.$valid) {
            this.commentService.post(this.newComment)
                .then((comment)=> {
                    this.$log.debug("success createCourse...");
                    this.comments.push(comment);
                }).catch((err)=> {
                this.$log.debug("fail createCourse..." + err);
            })

        }
    }

    deleteComment(item:IComment):void {
        this.commentService.delete(item._id).then(()=> {
            this.comments.splice(this.comments.indexOf(item), 1);
        });
    }

    showComment(item:IComment):void {
        item.isVisible=true;
        this.commentService.put( item._id, item).then(()=> {
            this.comments.splice(this.comments.indexOf(item), 1, item);
        });
    }
    answerComment(item:IComment):void {
        item.answered=true;
        this.commentService.put( item._id, item).then(()=> {
            this.comments.splice(this.comments.indexOf(item), 1, item);
        });
    }

}
