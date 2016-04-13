/**
 * Created by Galyna on 08.04.2016.
 */
(function () {

    angular
        .module('admin')
        .controller('AdminController', ['$scope', '$mdDialog', '$mdSidenav', '$templateCache', 'courseService', '$log', 'Upload', '$timeout', AdminController
        ]);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    function AdminController($scope, $mdDialog, $mdSidenav, $templateCache, courseService, $log, Upload, $timeout) {
        var vm = this;

        vm.courses = [];
        vm.editCourseModel = {};
        vm.showCourseEditForm = false;
        vm.showImageUpload = false;

        vm.deleteCourse = deleteCourse;
        vm.editCourse = editCourse;
        vm.showEditForm = showEditForm;
        vm.closeEditForm = closeEditForm;
        vm.deleteFromList = deleteFromList;
        vm.saveModuleDate = saveModuleDate;
        vm.uploadPhoto = uploadPhoto;

        //init page data
        getCourses();

        function cancel() {
            $mdDialog.hide();
        }

        function getCourses() {
            courseService.get().then(function (data) {
                vm.courses = data;
                vm.courses.forEach(function (item) {
                    item.courseModulesDates = item.courseModulesDates.map(function (date) {
                        return new Date(date);
                    })
                })
            })
        }

        //course edit start
        function editCourse(form) {
            $log.debug("editCourse ...$valid" + form.$valid);
            if (form.$valid) {
                courseService.put(vm.editCourseModel._id, vm.editCourseModel)
                    .then(function (course) {
                        $log.debug("selectedIndexforEdit ..." + vm.editCourseModel.oldIndex);
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

        function closeEditForm() {
            vm.editCourseModel = {};
            vm.showCourseEditForm = false;
        }

        //course date start
        function saveModuleDate() {
            $mdDialog.hide();
            $log.debug("new date..." + vm.editCourseModel.newDateModel.toString());
            vm.editCourseModel.courseModulesDates.push(vm.editCourseModel.newDateModel);
        }

        function deleteFromList(list, item) {
            list.splice(list.indexOf(item), 1);
        }

        //course date end

        //course image upload start
        function uploadPhoto(file,collection) {

            file.upload = Upload.upload({
                url: '/api/course/' + vm.editCourseModel._id + '/hearFormsPhotos',
                data: {name: "", file: file}

            });

            file.upload.then(function (response) {
                $timeout(function () {
                    vm.showImageUpload=false;
                    collection.push(response.data);
                });
            });
        }

        //course image upload end
        //course edit end

        function deleteCourse(item) {
            courseService.delete(item._id).then(function () {
                vm.courses.splice(vm.courses.indexOf(item), 1);
            })
        }


    }
})();


