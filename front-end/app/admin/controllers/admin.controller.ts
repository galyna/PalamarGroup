/**
 * Created by Galyna on 08.04.2016.
 */

import {ICourseService} from "../services/course.service";
import ICourse = pg.models.ICourse;


export class AdminController {

    static $inject = ['courseService', '$log', 'Upload', '$timeout',];
    static componentName = 'AdminController';

    courses:[ICourse];
    editCourseModel:ICourse;
    newCourseModel:ICourse;
    showCourseEditForm:boolean;
    showCourseCreateForm:boolean;
    showHistoryPhotoUpload:boolean;
    showFormPhotoUpload:boolean;

    constructor(private courseService:ICourseService, private $log:ng.ILogService,
                private Upload:ng.angularFileUpload.IUploadService, private $timeout:ng.ITimeoutService) {

        courseService.get().then((courses) => {
            this.courses = courses;

        }).catch(function (err) {
            $log.error(err);
        });
    }

    //course creation start
    showCreateForm():void {
        this.newCourseModel = {
            name: "",
            description: "",
            price: 0,
            order: 0,
            videos: [],
            hearFormsPhotos: [],
            historyPhotos: [],
            author: {
                name: "",
                photoUrl: ""
            },
            courseModulesDates: [],
            isVisible: true,
            // newDateModel: new Date()
        };
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
        if(form.$valid) {
            this.courseService.put(this.editCourseModel._id, this.editCourseModel)
                .then(()=> {
                    this.courses.splice(this.editCourseModel.oldIndex, 1, this.editCourseModel);
                    this.editCourseModel = {};
                }).catch((err)=> {
                this.$log.debug("fail editCourse..." + err);
            }).finally(()=> {
                this.showCourseEditForm = false;
            });
        }
    }

    showEditForm(course:ICourse):void {
        this.$log.debug("model for edit ..." + course._id + "" + course.name);
        this.editCourseModel = angular.copy(course);
        this.editCourseModel.oldIndex = this.courses.indexOf(course);
        this.editCourseModel.newDateModel = new Date();
        this.showCourseEditForm = true;
        this.showCourseCreateForm = false;
    }
    //course edit end

    //course image upload start
    uploadAuthorPhoto(file:ng.angularFileUpload.IFileUploadConfigFile, model:ICourse):void {
        file.upload = this.Upload.upload({
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

    uploadCollPhoto(file:ng.angularFileUpload.IFileUploadConfigFile, collection:[ICourse]):void {
        file.upload = this.Upload.upload({
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
    saveModuleDate(model:ICourse, date:Date):void {
        model.courseModulesDates.push(date);
    }
    //course date end

    deleteCourse(item:ICourse):void {
        this.courseService.delete(item._id).then(()=> {
            this.courses.splice(this.courses.indexOf(item), 1);
        });
    }

    deleteFromList(list:[any], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

}



