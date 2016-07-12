import {ICourseResource, CourseResourceName} from "../../../resources/course.resource";
import IComment = pg.models.IComment;
import {PagingService, PagingServiceName, IPagingHelperParams} from "../../../ui/admin.paging";

const editDialogTemplate = ``;

class EditDialogController{

}

const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <md-subheader>Відгуки</md-subheader>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>
<md-list flex class="comments-list">
    
    <md-list-item class="md-3-line md-long-text" ng-class="{new:!comment.isModerated}"
                  ng-repeat="comment in $ctrl.comments" ng-click="$ctrl.moderateComment(comment)">
        <div class="md-list-item-text">
            <h3>{{::comment.name||'Анонім'}} {{::comment.date| date:'dd.MM.yyyy'}}</h3>
            <p>{{comment.text}}</p>
        </div>

        <md-checkbox ng-model="comment.isVisible"
                     ng-click="$ctrl.showComment(comment)">
            <md-tooltip>
                Показати відгук на сайті
            </md-tooltip>
        </md-checkbox>
        <md-icon ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.showEditDialog($event, comment)"
                 class="md-secondary" aria-label="edit"
                 md-svg-icon="content:ic_create_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Редагувати</md-tooltip>
        </md-icon>
        <md-icon ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.showDeleteDialog($event, comment)"
                 class="md-secondary" aria-label="delete"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>`;

interface IConfirmMsg {
    isVisible:string;
    isNotVisible:string;
    isAnswered:string;
    isNotAnswered:string;
    isDeleted:string
}

export class CommentsComponentController {

    static $inject = [CourseResourceName, '$log', '$mdToast','$location','$mdDialog', PagingServiceName];
    static componentName = 'AcademyCommentController';

    comments:any;
    paging: IPagingHelperParams;
    confirmMsg:IConfirmMsg;

    constructor(private CourseResource:ICourseResource, private $log:ng.ILogService,
                private $mdToast:ng.material.IToastService,private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private pagingService:PagingService) {
        this.showPage();

        this.setConfirmMsg();
    }

    showCourse(id:string):void {
        this.$location.url( '/academy/course/'+id );
    }

    showEditDialog(course:pg.models.IAdminComment, ev:MouseEvent){
        this.$mdDialog.show({
            template: editDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                course: course
            },
            targetEvent: ev,
            clickOutsideToClose: true,
        }).then((comment) => this.saveComment(comment));
    }

    saveComment(comment:pg.models.IAdminComment){

    }

    showDeleteDialog(ev, comment:pg.models.IAdminComment) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити dsluer ${comment.text?comment.text:""}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => {
                return this.deleteComment(comment);
            });
    }

    deleteComment(comment:pg.models.IAdminComment) {

        this.CourseResource.deleteComment( {id: comment.courseId, commentId: comment._id} ).$promise.then( () => {
            this.comments.splice( this.comments.indexOf( comment ), 1 );
            this.$mdToast.showSimple( this.confirmMsg.isDeleted);
        } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            )


    }

    //noinspection JSMethodCanBeStatic
    showComment(comment:pg.models.IAdminComment) {
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
    moderateComment(comment:pg.models.IAdminComment) {
        if(comment.isModerated) return;
        comment.isModerated = true;
        this.CourseResource.editComment({id: comment.courseId}, {isModerated:true}).$promise.then(() => {
            this.$mdToast.showSimple(this.confirmMsg.isAnswered);
        })
            .catch( (err) => {
                this.$mdToast.showSimple( err.message );
            });
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.comments = this.CourseResource.getComments({page: page, sort: {"date":1}},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders(headers);
                this.pagingService.update({page: page, perPage: perPage, total: total});
                this.paging = angular.copy(this.pagingService.params());
            });
    }

    private setConfirmMsg():void {
        this.confirmMsg = {
            isDeleted: 'Відгук видалено',
            isVisible: 'Дозволено показати відгук на сайті',
            isNotVisible: 'Заборонено показувати відгук на сайті',
            isAnswered: 'Відгук перевірено',
            isNotAnswered: 'Відгук не перевірено'
        };
    }
}

export let CommentsComponentUrl = "/academy/comments";
export let CommentsComponentName = "pgComments";
export let CommentsComponentOptions = {
    template: template,
    controller: CommentsComponentController
};