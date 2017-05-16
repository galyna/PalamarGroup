import IPhoto = pg.models.IPhoto;
import {ICourseResource, ICourse, CourseResourceName} from "../../../resources/course.resource";
import {AdminCourseComponentUrl} from "./course.component";
import {PagingService, PagingServiceName} from "../../../ui/admin.paging";

const template = `<md-toolbar>
<div class="md-toolbar-tools">
    <h1>Курси</h1>
    <span flex></span>
      <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
    </md-toolbar>
<md-button ng-click="$ctrl.showEditForm()" ng-if="::$root.it.can('modifyAcademy')"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати курс</md-tooltip>
</md-button>
<div>
    <md-list>
        <md-list-item class="md-2-line" ng-repeat="course in $ctrl.courses" ng-click=" $ctrl.showEditForm(course)">
            <img ng-src="{{::course.avatar}}" class="md-avatar" alt="No photo"/>
            <div class="md-list-item-text" layout="column">
                <h3>{{::course.name}}</h3>
                <p>{{::$ctrl.getCourseDates(course)}}</p>
            </div>
            <md-icon ng-if="::$root.it.can('modifyAcademy')" ng-click="$ctrl.showEditForm(course)" class="md-secondary" md-svg-icon="content:ic_create_24px">
                <md-tooltip >Редагувати</md-tooltip>
            </md-icon>
            <md-icon ng-if="::$root.it.can('modifyAcademy')" ng-click="$ctrl.cloneCourse(course)" class="md-secondary" md-svg-icon="av:ic_library_add_24px">
                <md-tooltip >Клонувати</md-tooltip>
            </md-icon>
            <md-icon ng-if="::$root.it.can('modifyAcademy')" ng-click="$ctrl.showDeleteDialog($event, course)" class="md-secondary"
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip >Видалити</md-tooltip>
            </md-icon>
            <md-divider></md-divider>
        </md-list-item>
    </md-list>
</div>`;

export class AdminCoursesController {

    static $inject = [CourseResourceName, '$log', '$timeout', '$location', '$mdDialog',
        '$mdToast', PagingServiceName];

    courses: ICourse[];
    paging: any;

    constructor(private CourseResource: ICourseResource, private $log: ng.ILogService,
                private $timeout: ng.ITimeoutService, private $location: ng.ILocationService,
                private $mdDialog: ng.material.IDialogService, private $mdToast: ng.material.IToastService,
                private pagingService: PagingService) {
    }

    $onInit() {
        this.showPage();
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.courses = this.CourseResource.query({page: page,perPage: 10},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }

    showEditForm(course = new this.CourseResource()) {
        let id = course._id || "";
        let url = AdminCourseComponentUrl.replace(':id', id);
        this.$location.url(url);
    }

    showDeleteDialog(ev, course: ICourse) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити курс ${course.name}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => {
                return this.deleteCourse(course);
            });
    }

    deleteCourse(course: ICourse) {
        return course.$delete()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} видалено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            })
            .finally(()=> {
                this.showPage(this.pagingService.currentPage());
            });
    }

    cloneCourse(course: ICourse) {
        var newCourse = new this.CourseResource(course);
        delete newCourse._id;
        newCourse.days = [];
        newCourse.isVisible = false;
        newCourse.$save()
            .then(this.showEditForm.bind(this))
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            }).finally(()=> {
            this.showPage(this.pagingService.currentPage());
        });
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list: any[], item: any): void {
        list.splice(list.indexOf(item), 1);
    }


    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }
}

export let AdminCoursesComponentUrl = "/academy/courses";
export let AdminCoursesComponentName = "pgAdminCourses";
export let AdminCoursesComponentOptions = {
    template: template,
    controller: AdminCoursesController
};