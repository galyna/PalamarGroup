import IPhoto = pg.models.IPhoto;
import {ICourseResource, ICourse, CourseResourceName} from "../../../resources/course.resource";

const template = `<md-button ng-click="$ctrl.showEditForm()" ng-if="!$ctrl.courseToSave"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати курс</md-tooltip>
</md-button>
<div ng-if="!$ctrl.courseToSave">

    <md-list>
        <md-list-item class="md-2-line" ng-repeat="course in $ctrl.courses" ng-click="$ctrl.showEditForm(course)">
            <img ng-src="{{::course.hearFormsPhotos[0].url}}" class="md-avatar" alt="No photo"/>
            <div class="md-list-item-text" layout="column">
                <h3>{{::course.name}}</h3>
                <p>{{::$ctrl.getCourseDates(course)}}</p>
            </div>
            <md-icon ng-click="$ctrl.showEditForm(course)" class="md-secondary" md-svg-icon="content:ic_create_24px">
                <md-tooltip>Редагувати</md-tooltip>
            </md-icon>
            <md-icon ng-click="$ctrl.cloneCourse(course)" class="md-secondary" md-svg-icon="av:ic_library_add_24px">
                <md-tooltip>Клонувати</md-tooltip>
            </md-icon>
            <md-icon ng-click="$ctrl.showDeleteDialog($event, course)" class="md-secondary"
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip>Видалити</md-tooltip>
            </md-icon>
            <md-divider></md-divider>
        </md-list-item>
    </md-list>
</div>
<pg-admin-course ng-if="$ctrl.courseToSave" on-cancel="$ctrl.cancel($event)" on-save="$ctrl.saveCourse($event)"
                 course="$ctrl.courseToSave"></pg-admin-course>`;

export class AdminCoursesController {

    static $inject = [CourseResourceName, '$log', 'Upload', '$timeout', '$location', '$mdDialog',
        '$mdToast'];

    courses:ICourse[];
    courseToSave:ICourse;
    showHistoryPhotoUpload:boolean;
    showFormPhotoUpload:boolean;
    showAuthorPhotoUpload:boolean;

    constructor(private CourseResource:ICourseResource, private $log:ng.ILogService,
                private Upload, private $timeout:ng.ITimeoutService, private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService) {
        this.courses = this.getCourses();
    }

    //TODO: add paging handling
    getCourses() {
        return this.CourseResource.query();
    }

    showEditForm(course = new this.CourseResource()) {
        this.courseToSave = course;
    }

    cancel() {
        this.courseToSave = undefined;
    }

    saveCourse({course}: {course:ICourse}) {
        course.$save()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorToast();
            })
            .finally(()=> {
                this.courses = this.getCourses();
                this.courseToSave = undefined;
            });
    }

    //course image upload start
    uploadAuthorPhoto(dataUrl, name, model:ICourse):void {
        this.Upload.upload({
            method: 'POST',
            url: '/api/photo',
            data: {
                file: this.Upload.dataUrltoBlob(dataUrl, name)
            }

        }).then((response)=> {
            this.$timeout(()=> {
                model.author.photoUrl = response.data.url;
            });
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        }).finally(()=> {
            this.$timeout(()=> {
                this.showAuthorPhotoUpload = false;
            });
        });
    }

    //TODO: add file param type
    uploadCollPhoto(dataUrl, name, collection:IPhoto[]):void {
        this.Upload.upload({
            method: 'POST',
            url: '/api/photo',
            data: {
                file: this.Upload.dataUrltoBlob(dataUrl, name)
            }

        }).then((response)=> {
            this.$timeout(()=> {
                collection.push({
                    name: "",
                    url: response.data.url,
                    order: 0
                });
            });
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        }).finally(()=> {
            this.$timeout(()=> {
                this.showFormPhotoUpload = false;
                this.showHistoryPhotoUpload = false;
            });
        });
    }

    //course image upload end

    //course date start
    //noinspection JSMethodCanBeStatic
    saveModuleDate(model:ICourse, date:Date):void {
        model.courseModulesDates.push(date.toJSON());
    }

    //course date end

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
        newCourse.courseModulesDates = [];
        newCourse.isVisible = false;
        this.showEditForm(course);
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }
}

export let AdminCoursesComponentName = "pgAdminCourses";
export let AdminCoursesComponentOptions = {
    template: template,
    controller: AdminCoursesController
};