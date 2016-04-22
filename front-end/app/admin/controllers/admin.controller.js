/**
 * Created by Galyna on 08.04.2016.
 */
(function () {

    angular
        .module('admin')
        .controller('AdminController', [ 'adminService', '$log', 'Upload', '$timeout', AdminController
        ]);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    function AdminController( adminService, $log, Upload, $timeout) {
        var vm = this;

        vm.courses = [];
        vm.editCourseModel = {};
        vm.newCourseModel = {};
        vm.showCourseEditForm = false;
        vm.showCourseCreateForm = false;
        vm.showHistoryPhotoUpload = false;
        vm.showFormPhotoUpload = false;

        vm.createCourse = createCourse;
        vm.deleteCourse = deleteCourse;
        vm.editCourse = editCourse;
        vm.showEditForm = showEditForm;
        vm.showCreateForm = showCreateForm;
        vm.deleteFromList = deleteFromList;
        vm.saveModuleDate = saveModuleDate;
        vm.uploadAuthorPhoto = uploadAuthorPhoto;
        vm.uploadCollPhoto = uploadCollPhoto;

        //init page data
        getCourses();

        function getCourses() {
            adminService.get().then(function (data) {
                vm.courses = data;
                vm.courses.forEach(function (item) {
                    item.courseModulesDates = item.courseModulesDates.map(function (date) {
                        return new Date(date);
                    })
                })
            })
        }

        //course creation start
        function showCreateForm() {
            vm.newCourseModel = {
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
            vm.showCourseEditForm = false;
            vm.showCourseCreateForm = true;
        }

        function createCourse(form) {
            $log.debug("createCourse ...$valid" + form.$valid);
            if (form.$valid) {
                adminService.post(vm.newCourseModel)
                    .then(function (course) {
                        $log.debug("success createCourse...");
                        vm.courses.push(course);
                    }).catch(function (err) {
                    $log.debug("fail createCourse..." + err);
                }).finally(function () {
                    vm.showCourseCreateForm = false;
                });

            }
        }

        //course creation start

        // course edit start
        function editCourse(form) {
            $log.debug("editCourse ...$valid" + form.$valid);
            $log.debug("editCourse ...vm.editCourseModel._id===" + vm.editCourseModel._id);
            if (form.$valid) {
                adminService.put(vm.editCourseModel._id, vm.editCourseModel)
                    .then(function () {
                        vm.courses.splice(vm.editCourseModel.oldIndex, 1, vm.editCourseModel);
                        vm.editCourseModel = {};
                    }).catch(function (err) {
                    $log.debug("fail editCourse..." + err);
                }).finally(function () {
                    vm.showCourseEditForm = false;
                });
            }
        }

        function showEditForm(course) {
            $log.debug("model for edit ..." + course._id + "" + course.name);
            vm.editCourseModel = angular.copy(course);
            vm.editCourseModel.oldIndex = vm.courses.indexOf(course);
            vm.editCourseModel.newDateModel = new Date();
            vm.showCourseEditForm = true;
            vm.showCourseCreateForm = false;
        }

        //course edit end

        //course image upload start
        function uploadAuthorPhoto(file, model) {
            file.upload = Upload.upload({
                url: '/api/photo',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    model.author.photoUrl = response.data.url;
                });
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                $timeout(function () {
                    vm.showAuthorPhotoUpload = false;
                });
            });
        }

        function uploadCollPhoto(file, collection) {
            file.upload = Upload.upload({
                url: '/api/photo',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    collection.push({
                        name: "",
                        url: response.data.url,
                        order: 0
                    });
                });
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                $timeout(function () {
                    vm.showFormPhotoUpload = false;
                    vm.showHistoryPhotoUpload = false;
                });
            });
            ;
        }

        //course image upload end

        //course date start
        function saveModuleDate(model, date) {
            model.courseModulesDates.push(date);
        }

        //course date end
        function deleteCourse(item) {
            adminService.delete(item._id).then(function () {
                vm.courses.splice(vm.courses.indexOf(item), 1);
            })
        }

        function deleteFromList(list, item) {
            list.splice(list.indexOf(item), 1);
        }

    }
})
();


