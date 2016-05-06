/**
 * Created by Galyna on 08.04.2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AdminController;
    return {
        setters:[],
        execute: function() {
            AdminController = (function () {
                function AdminController(courseService, $log, Upload, $timeout) {
                    var _this = this;
                    this.courseService = courseService;
                    this.$log = $log;
                    this.Upload = Upload;
                    this.$timeout = $timeout;
                    courseService.get().then(function (courses) {
                        _this.courses = courses;
                    }).catch(function (err) {
                        $log.error(err);
                    });
                }
                //course creation start
                AdminController.prototype.showCreateForm = function () {
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
                        newDateModel: new Date()
                    };
                    this.showCourseEditForm = false;
                    this.showCourseCreateForm = true;
                };
                AdminController.prototype.createCourse = function (form) {
                    var _this = this;
                    this.$log.debug("createCourse ...$valid" + form.$valid);
                    if (form.$valid) {
                        this.courseService.post(this.newCourseModel)
                            .then(function (course) {
                            _this.$log.debug("success createCourse...");
                            _this.courses.push(course);
                        }).catch(function (err) {
                            _this.$log.debug("fail createCourse..." + err);
                        }).finally(function () {
                            _this.showCourseCreateForm = false;
                        });
                    }
                };
                //course creation start
                // course edit start
                AdminController.prototype.editCourse = function (form) {
                    var _this = this;
                    this.$log.debug("editCourse ...$valid" + form.$valid);
                    this.$log.debug("editCourse ...vm.editCourseModel._id===" + this.editCourseModel._id);
                    if (form.$valid) {
                        this.courseService.put(this.editCourseModel._id, this.editCourseModel)
                            .then(function () {
                            _this.courses.splice(_this.editCourseModel.oldIndex, 1, _this.editCourseModel);
                            _this.editCourseModel = {};
                        }).catch(function (err) {
                            _this.$log.debug("fail editCourse..." + err);
                        }).finally(function () {
                            _this.showCourseEditForm = false;
                        });
                    }
                };
                AdminController.prototype.showEditForm = function (course) {
                    this.$log.debug("model for edit ..." + course._id + "" + course.name);
                    this.editCourseModel = angular.copy(course);
                    this.editCourseModel.oldIndex = this.courses.indexOf(course);
                    this.editCourseModel.newDateModel = new Date();
                    this.showCourseEditForm = true;
                    this.showCourseCreateForm = false;
                };
                //course edit end
                //course image upload start
                AdminController.prototype.uploadAuthorPhoto = function (file, model) {
                    var _this = this;
                    file.upload = this.Upload.upload({
                        url: '/api/photo',
                        data: { file: file }
                    });
                    file.upload.then(function (response) {
                        _this.$timeout(function () {
                            model.author.photoUrl = response.data.url;
                        });
                    }).catch(function (err) {
                        _this.$log.debug("fail upload file..." + err);
                    }).finally(function () {
                        _this.$timeout(function () {
                            _this.showAuthorPhotoUpload = false;
                        });
                    });
                };
                AdminController.prototype.uploadCollPhoto = function (file, collection) {
                    var _this = this;
                    file.upload = this.Upload.upload({
                        url: '/api/photo',
                        data: { file: file }
                    });
                    file.upload.then(function (response) {
                        _this.$timeout(function () {
                            collection.push({
                                name: "",
                                url: response.data.url,
                                order: 0
                            });
                        });
                    }).catch(function (err) {
                        _this.$log.debug("fail upload file..." + err);
                    }).finally(function () {
                        _this.$timeout(function () {
                            _this.showFormPhotoUpload = false;
                            _this.showHistoryPhotoUpload = false;
                        });
                    });
                    ;
                };
                //course image upload end
                //course date start
                AdminController.prototype.saveModuleDate = function (model, date) {
                    model.courseModulesDates.push(date);
                };
                //course date end
                AdminController.prototype.deleteCourse = function (item) {
                    var _this = this;
                    this.courseService.delete(item._id).then(function () {
                        _this.courses.splice(_this.courses.indexOf(item), 1);
                    });
                };
                AdminController.prototype.deleteFromList = function (list, item) {
                    list.splice(list.indexOf(item), 1);
                };
                AdminController.$inject = ['courseService', '$log', 'Upload', '$timeout',];
                AdminController.componentName = 'AdminController';
                return AdminController;
            }());
            exports_1("AdminController", AdminController);
        }
    }
});
//# sourceMappingURL=admin.controller.js.map