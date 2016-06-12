/**
 * Created by Galyna on 14.05.2016.
 */
import {ICourse, ICourseResource, CourseResourceName} from "../../../resources/course.resource";
import IComment = pg.models.IComment;

interface IConfirmMsg {
    isVisible:string;
    isNotVisible:string;
    isAnswered:string;
    isNotAnswered:string
}


export class AcademyCommentController {

    static $inject = [CourseResourceName, '$log', '$mdToast','$location'];
    static componentName = 'AcademyCommentController';

    comments:any;

    confirmMsg:IConfirmMsg;

    constructor(private CourseResource:ICourseResource, private $log:ng.ILogService,
                private $mdToast:ng.material.IToastService,private $location:ng.ILocationService) {
        this.comments = this.CourseResource.getComments();

        this.setConfirmMsg();
    }

    showCourse(id:string):void {
        this.$location.url( '/course/'+id );
    }

    deleteComment(comment:any):void {

        this.CourseResource.deleteComment( {id: comment.courseId, commentId: comment._id} ).$promise.then( () => {
                this.comments.splice( this.comments.indexOf( comment ), 1 );
            } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            )


    }

    //noinspection JSMethodCanBeStatic
    showComment(comment:any):void {
        let newComment={
            _id:comment._id,
            name: comment.name,
            text: comment.text,
            date:comment.date,
            isVisible:! comment.isVisible,
            isModerated: comment.isModerated,
        }
        this.CourseResource.editComment( {id: comment.courseId}, newComment ).$promise.then( () => {
                if (comment.isVisible) {
                    this.$mdToast.showSimple( this.confirmMsg.isVisible );
                } else {
                    this.$mdToast.showSimple( this.confirmMsg.isNotVisible );
                }
            } )
            .catch( (err) => {
                    this.$mdToast.showSimple( err.message );
                }
            )
    }

    //noinspection JSMethodCanBeStatic
    moderateComment(comment:any):void {
        let newComment={
            _id:comment._id,
            name: comment.name,
            text: comment.text,
            date:comment.date,
            isVisible: comment.isVisible,
            isModerated:! comment.isModerated,
        }
        this.CourseResource.editComment( {id: comment.courseId}, newComment ).$promise.then( () => {
                if (comment.isModerated) {
                    this.$mdToast.showSimple( this.confirmMsg.isAnswered );
                } else {
                    this.$mdToast.showSimple( this.confirmMsg.isNotAnswered );
                }
            } )
            .catch( (err) => {
                    this.$mdToast.showSimple( err.message );
                }
            )

    }

    private setConfirmMsg():void {
        this.confirmMsg = {
            isVisible: 'Дозволено показати відгук на сайті',
            isNotVisible: 'Заборонено показувати відгук на сайті',
            isAnswered: 'Відгук перевірено',
            isNotAnswered: 'Відгук не перевірено'
        };
    }
}
