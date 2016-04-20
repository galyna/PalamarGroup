(function () {
    angular.module('courses')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['$log', '$routeParams', 'courseService', 'orderService', '$location'];
    function CourseController($log, $routeParams, courseService, orderService, $location) {
        var vm = this;
        var order = {
            model: {
                name: '',
                email: '',
                phone: ''
            },
            formVisible: false,
            showForm: function (course) {
                this.formVisible = true;
            },
            hideForm: function () {
                this.formVisible = false;
            },
            submit: submitOrder
        };

        vm.backToHome = backToHome;
        
        function backToHome() {
            $location.url('/home');
        }

        function submitOrder(form) {
            var that = this;
            that.hideForm();
            if (this.model.email || this.model.phone) {
                this.model.event = vm.course._id;
                orderService.post(this.model)
                    .then(function () {
                        that.hideForm();
                    })
                    .catch(function (err) {
                        $log.error(err);
                    });
            }
        }

        courseService.get($routeParams.id).then(function (course) {
            vm.course = course;
            vm.order = order;
        }).catch(function (err) {
            $log.error(err);
        });
    }
})();