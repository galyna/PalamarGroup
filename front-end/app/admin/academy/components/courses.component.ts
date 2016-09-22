import IPhoto = pg.models.IPhoto;
import {ICourseResource, ICourse, CourseResourceName} from "../../../resources/course.resource";
import {AdminCourseComponentUrl} from "./course.component";

const template = `
<md-button ng-click="$ctrl.showEditForm()" ng-disabled="!$root.it.can('modifyAcademy');"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати курс</md-tooltip>
</md-button>
<div>
    <md-list>
        <md-list-item class="md-2-line" ng-repeat="course in $ctrl.courses" ng-click="$root.it.can('modifyAcademy') && $ctrl.showEditForm(course)">
            <img ng-src="{{::course.avatar}}" class="md-avatar" alt="No photo"/>
            <div class="md-list-item-text" layout="column">
                <h3>{{::course.name}}</h3>
                <p>{{::$ctrl.getCourseDates(course)}}</p>
            </div>
            <md-icon ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.showEditForm(course)" class="md-secondary" md-svg-icon="content:ic_create_24px">
                <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Редагувати</md-tooltip>
            </md-icon>
            <md-icon ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.cloneCourse(course)" class="md-secondary" md-svg-icon="av:ic_library_add_24px">
                <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Клонувати</md-tooltip>
            </md-icon>
            <md-icon ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.showDeleteDialog($event, course)" class="md-secondary"
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
            </md-icon>
            <md-divider></md-divider>
        </md-list-item>
    </md-list>
</div>`;

export class AdminCoursesController {

    static $inject = [CourseResourceName, '$log', '$timeout', '$location', '$mdDialog',
        '$mdToast'];

    courses:ICourse[];

    constructor(private CourseResource:ICourseResource, private $log:ng.ILogService,
                private $timeout:ng.ITimeoutService, private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService) {
        this.courses = this.getCourses();
    }

    //TODO: add paging handling
    getCourses() {
        return this.CourseResource.query();
    }

    showEditForm(course = new this.CourseResource()) {
        let id = course._id || "";
        let url = AdminCourseComponentUrl.replace(':id', id);
        this.$location.url(url);
    }

    showDeleteDialog(ev, course:ICourse) {
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

    deleteCourse(course:ICourse) {
        return course.$delete()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} видалено`);
            })
            .catch((err) => {
                this.$log.error(err);
                this.showErrorToast()
            })
            .finally(()=> {
                this.courses = this.getCourses();
            });
    }

    cloneCourse(course:ICourse) {
        var newCourse = new this.CourseResource(course);
        delete newCourse._id;
        newCourse.days = [];
        newCourse.isVisible = false;
        newCourse.$save()
            .then(this.showEditForm.bind(this))
            .catch(this.showErrorToast.bind(this));
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }
}

export let AdminCoursesComponentUrl = "/academy/courses";
export let AdminCoursesComponentName = "pgAdminCourses";
export let AdminCoursesComponentOptions = {
    template: template,
    controller: AdminCoursesController
};