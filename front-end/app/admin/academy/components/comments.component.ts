import {ICourseResource, CourseResourceName} from "../../../resources/course.resource";
import IComment = pg.models.IComment;
import {PagingService, PagingServiceName, IPagingHelperParams} from "../../../ui/admin.paging";
import IAdminComment = pg.models.IAdminComment;

const editDialogTemplate = `<md-dialog aria-label="Comment edit" flex="80">
    <form name="editForm" ng-submit="$ctrl.save(editForm)" novalidate>
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>Редагування відгуку</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content">
                <h3>{{$ctrl.comment.courseName}} </h3>
                <md-input-container class="md-block">
                    <label>Автор</label>
                    <input type="text" ng-model="$ctrl.comment.name" required>
                </md-input-container>

                <md-input-container class="md-block">
                    <label>Відгук</label>
                    <textarea ng-model="$ctrl.comment.text"></textarea>
                </md-input-container>
                <div layout="column" >
                   <p>Відгук створено {{$ctrl.comment.date|date:'dd.MM.yyyy'}}</p>
                 
                    <md-checkbox class="md-block " ng-model="$ctrl.comment.isVisible">
                        Показати на сайті
                    </md-checkbox>
                    <md-checkbox class="md-block " ng-model="$ctrl.comment.isModerated">
                        Відгук перевірено
                    </md-checkbox>
                </div>
       
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>`;

class EditDialogController {

    static $inject = ['$mdDialog', 'comment'];

    private comment:IAdminComment;
    private originalComment:IAdminComment;

    constructor(private $mdDialog:ng.material.IDialogService, comment:IAdminComment) {
        this.comment = angular.copy( comment );
        this.originalComment = comment;
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend( this.originalComment, this.comment );
            this.$mdDialog.hide( this.originalComment );
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h1>Відгуки</h1>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>
<md-list flex class="comments-list">

    <md-list-item class="md-3-line md-long-text" ng-class="{answered:comment.isModerated, approved:comment.isVisible}"
                  ng-repeat="comment in $ctrl.comments" ng-click="::$root.it.can('modifyAcademy') && $ctrl.showEditDialog($event, comment)">
        <div class="md-list-item-text">
            <h2 ng-if="comment.isVisible" class="approved-titlt">Відгук видимий на сайті </h2>
            <h3>{{::comment.name||'Анонім'}} </h3>
            <p>{{comment.text}}</p>
            <h3>{{comment.courseName}} </h3>
            <p ng-if="comment.isModerated">Відгук перевірено </p>
        </div>
        <div class="md-secondary md-margin">
            <md-checkbox ng-model="comment.isVisible" ng-disabled="::!$root.it.can('modifyAcademy')"
                         ng-click="::$root.it.can('modifyAcademy') && $ctrl.showComment(comment)"></md-checkbox>
            <md-tooltip>
                Показати на сайті
            </md-tooltip>
        </div>
        <md-icon ng-click="$ctrl.showEditDialog($event, comment)" ng-if="::$root.it.can('modifyAcademy')"
                 class="md-secondary" aria-label="edit"
                 md-svg-icon="content:ic_create_24px">
            <md-tooltip >Редагувати</md-tooltip>
        </md-icon>
        <md-icon ng-click="$ctrl.showDeleteDialog($event, comment)" ng-if="::$root.it.can('modifyAcademy')"
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
    isDeleted:string,
    isSaved:string
}

export class CommentsComponentController {

    static $inject = [CourseResourceName, '$log', '$mdToast', '$location', '$mdDialog', PagingServiceName];
    static componentName = 'AcademyCommentController';

    comments:pg.models.IAdminComment[];
    paging:IPagingHelperParams;
    confirmMsg:IConfirmMsg;

    constructor(private CourseResource:ICourseResource, private $log:ng.ILogService,
                private $mdToast:ng.material.IToastService, private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private pagingService:PagingService) {
        this.showPage();

        this.setConfirmMsg();
    }

    showCourse(id:string):void {
        this.$location.url( '/academy/course/' + id );
    }

    showEditDialog(ev:MouseEvent, comment:pg.models.IAdminComment) {

        this.$mdDialog.show( {
            template: editDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                comment: comment
            },
            targetEvent: ev,
            parent: angular.element( document.body ),
        } ).then( (comment) => this.saveComment( comment ) );
    }

    saveComment(comment:pg.models.IAdminComment) {
        this.CourseResource.editComment( {id: comment.courseId}, this.convertToDbComment( comment ) ).$promise
            .then( ()=> {
                this.$mdToast.showSimple( this.confirmMsg.isSaved );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    showDeleteDialog(ev, comment:pg.models.IAdminComment) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити dsluer ${comment.text ? comment.text : ""}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteComment( comment );
            } );
    }

    deleteComment(comment:pg.models.IAdminComment) {

        this.CourseResource.deleteComment( {id: comment.courseId, commentId: comment._id} ).$promise.then( () => {
            this.comments.splice( this.comments.indexOf( comment ), 1 );
            this.$mdToast.showSimple( this.confirmMsg.isDeleted );
        } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );


    }

    //noinspection JSMethodCanBeStatic
    showComment(comment:pg.models.IAdminComment) {
        let newComment = {
            _id: comment._id,
            name: comment.name,
            text: comment.text,
            date: comment.date,
            isVisible: !comment.isVisible,
            isModerated: comment.isModerated,
        }
        this.CourseResource.editComment( {id: comment.courseId}, newComment ).$promise.then( () => {
            if (comment.isVisible) {
                this.$mdToast.showSimple( this.confirmMsg.isVisible );
            } else {
                this.$mdToast.showSimple( this.confirmMsg.isNotVisible );
            }
        } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }

    //noinspection JSMethodCanBeStatic
    moderateComment(comment:pg.models.IAdminComment) {
        if (comment.isModerated) return;
        comment.isModerated = true;
        this.CourseResource.editComment( {id: comment.courseId}, {isModerated: true} ).$promise
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );;
    }

    prev() {
        this.showPage( this.pagingService.prevPage() );
    }

    next() {
        this.showPage( this.pagingService.nextPage() );
    }

    private showPage(page = 1) {
        this.comments = this.CourseResource.getComments( {page: page, sort: {"isModerated": 1,"isVisible":-1,"date":-1}},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }

    private convertToDbComment(comment:pg.models.IAdminComment) {
        return <pg.models.IComment>{
            _id: comment._id,
            name: comment.name,
            text: comment.text,
            date: comment.date,
            isVisible: comment.isVisible,
            isModerated: comment.isModerated
        }
    }

    private setConfirmMsg() {
        this.confirmMsg = {
            isDeleted: 'Відгук видалено',
            isVisible: 'Дозволено показати відгук на сайті',
            isNotVisible: 'Заборонено показувати відгук на сайті',
            isAnswered: 'Відгук перевірено',
            isNotAnswered: 'Відгук не перевірено',
            isSaved: 'Відгук збережено'
        };
    }
    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }
}

export let CommentsComponentUrl = "/academy/comments";
export let CommentsComponentName = "pgComments";
export let CommentsComponentOptions = {
    template: template,
    controller: CommentsComponentController
};