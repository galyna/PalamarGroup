/**
 * Created by Galyna on 08.04.2016.
 */
(function () {

    angular
        .module('admin')
        .controller('AdminController', ['$mdDialog', '$mdSidenav', '$templateCache', 'courseService', '$log', 'Upload', '$timeout', AdminController
        ]);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    function AdminController($mdDialog, $mdSidenav, $templateCache, courseService, $log, Upload, $timeout) {
        var vm = this;

        vm.courses = [];
        vm.editCourseModel = {};
        vm.showCourseEditForm = false;
        vm.deleteCourse = deleteCourse;
        vm.editCourse = editCourse;
        vm.toggleLeftMenu = toggleLeftMenu;
        vm.showEditForm = showEditForm;
        vm.showImageUpload = showImageUpload;
        vm.deleteCourseDate = deleteCourseDate;
        vm.showAddDate = showAddDate;
        vm.cancel = cancel;
        vm.saveModuleDate = saveModuleDate;
        vm.uploadPic = uploadPic;

        //init page data
        getCourses();

        function cancel() {
            $mdDialog.hide();
        }

        function getCourses() {
            courseService.get().then(function (data) {
                vm.courses = data;
            })
        }

        function deleteCourse(item) {
            courseService.delete(item._id).then(function () {
                vm.courses.splice(vm.courses.indexOf(item), 1);
            })
        }

        function deleteCourseDate(list, item) {
            list.splice(list.indexOf(item), 1);
        }

        function editCourse(form) {
            if (form.$valid) {
                courseService.put(vm.editCourseModel._id, vm.editCourseModel)
                    .then(function (course) {
                        $log.debug("selectedIndexforEdit ..." + vm.selectedIndexforEdit);
                        vm.courses.splice(vm.editCourseModel.oldIndex, 1, vm.editCourseModel);
                        vm.selectedIndexforEdit = null;
                        vm.showCourseEditForm = false;
                        vm.editCourseModel = {};
                    }, function () {
                        $log.debug("fail editCourse...");
                    })
            }
        }

        function showEditForm(course) {
            $log.debug("model for edit ..." + course._id + "" + course.name);
            vm.editCourseModel = angular.copy(course);
            vm.editCourseModel.oldIndex = vm.courses.indexOf(course);
            vm.editCourseModel.newDateModel = new Date();
            vm.showCourseEditForm = true;
        }

        function showImageUpload() {

            $mdDialog.show({
                controller: 'AdminController',
                controllerAs: "vm",
                preserveScope: true,
                template: $templateCache.get('admin/views/upload.form.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true,

            });
        }

        function showAddDate() {
            $mdDialog.show({
                controller: 'AdminController',
                controllerAs: "vm",
                preserveScope: true,
                template: $templateCache.get('admin/views/add.course.date.form.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }

        function saveModuleDate() {
            $mdDialog.hide();
            $log.debug("new date..." + vm.editCourseModel.newDateModel.toString());
            vm.editCourseModel.courseModulesDates.push(vm.editCourseModel.newDateModel);
            $log.debug("typeof ..." + typeof  vm.editCourseModel.courseModulesDates );
        }

        function toggleLeftMenu() {
            $mdSidenav('left').toggle();
        }

        function uploadPic(file) {
            $log.debug("photoName..." + vm.photoName);
            file.upload = Upload.upload({
                url: 'http://localhost:8080/api/photo',
                data: {name: vm.photoName, file: file},
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    vm.upload.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }
})();


