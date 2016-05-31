/**
 * Created by Galyna on 12.05.2016.
 */


import {ICourseService} from "../services/course.service";
import ICourse = pg.models.ICourse;
import IPhoto = pg.models.IPhoto;

interface IEditCourseModel extends ICourse {
    oldIndex?:number;
    newDateModel?:Date;
}


export class AcademyCoursesController {

    static $inject = ['courseService', '$log', 'Upload', '$timeout', '$location'];
    static componentName = 'AcademyCoursesController';

    courses:ICourse[];
    editCourseModel:IEditCourseModel;
    newCourseModel:ICourse;
    showCourseEditForm:boolean;
    showCourseCreateForm:boolean;
    showHistoryPhotoUpload:boolean;
    showFormPhotoUpload:boolean;
    showAuthorPhotoUpload:boolean;

    constructor(private courseService:ICourseService, private $log:ng.ILogService,
                private Upload, private $timeout:ng.ITimeoutService, private $location:ng.ILocationService) {

        courseService.get().then((courses) => {
            this.courses = courses;
        }).catch(function (err) {
            $log.error(err);
        });
    }


    //course creation start
    showCreateForm():void {
        this.showCourseEditForm = false;
        this.showCourseCreateForm = true;
    }

    createCourse(form:ng.IFormController):void {
        this.$log.debug("createCourse ...$valid" + form.$valid);
        if (form.$valid) {
            this.courseService.post(this.newCourseModel)
                .then((course)=> {
                    this.$log.debug("success createCourse...");
                    this.courses.push(course);
                }).catch((err)=> {
                this.$log.debug("fail createCourse..." + err);
            }).finally(()=> {
                this.showCourseCreateForm = false;
            });

        }
    }

    //course creation start

    // course edit start
    editCourse(form:ng.IFormController):void {
        this.$log.debug("editCourse ...$valid" + form.$valid);
        this.$log.debug("editCourse ...vm.editCourseModel._id===" + this.editCourseModel._id);
        if (form.$valid) {
            this.courseService.put(this.editCourseModel._id, this.editCourseModel)
                .then(()=> {
                    this.courses.splice(this.editCourseModel.oldIndex, 1, this.editCourseModel);
                    this.editCourseModel = <IEditCourseModel>{};
                }).catch((err)=> {
                this.$log.debug("fail editCourse..." + err);
            }).finally(()=> {
                this.showCourseEditForm = false;
            });
        }
    }

    showEditForm(course:IEditCourseModel):void {
        this.$log.debug("model for edit ..." + course._id + "" + course.name);
        this.editCourseModel = angular.copy(course);
        this.editCourseModel.oldIndex = this.courses.indexOf(course);
        this.editCourseModel.newDateModel = new Date();
        this.showCourseEditForm = true;
        this.showCourseCreateForm = false;
    }

    //course edit end

    //course image upload start
    uploadAuthorPhoto(file, model:IEditCourseModel):void {
        file.upload = this.Upload.upload({
            method: 'POST',
            url: '/api/photo',
            data: {file: file}
        });

        file.upload.then((response)=> {
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
    uploadCollPhoto(file, collection:IPhoto[]):void {
        file.upload = this.Upload.upload({
            method: 'POST',
            url: '/api/photo',
            data: {file: file}
        });

        file.upload.then((response)=> {
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

    deleteCourse(item:ICourse):void {
        this.courseService.delete(item._id).then(()=> {
            this.courses.splice(this.courses.indexOf(item), 1);
        });
    }

    cloneCourse(course: ICourse):void {
        var newCourse = angular.copy(course);
        delete newCourse._id;
        newCourse.courseModulesDates = [];
        newCourse.isVisible = false;
        this.courseService.post(newCourse).then((course) => {
            this.showEditForm(course);
        }).catch((err) => {
            this.$log.error(err);
        });
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

}




