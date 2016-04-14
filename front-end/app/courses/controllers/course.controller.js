(function(){
    angular.module('courses')
        .controller('CourseController', CourseController);
    
    CourseController.$inject = ['$log', '$routeParams', 'courseService', 'orderService'];
    function CourseController($log, $routeParams, courseService, orderService){
        var vm = this;
        var order = {
            model: {
                name: '',
                email: '',
                phone: ''
            },
            formVisible: false,
            showForm: function(){
                this.formVisible = true;
            },
            hideForm: function () {
                this.formVisible = false;
            },
            submit: submitOrder
        };
        
        function submitOrder(form){
            var that = this;
            if(this.model.email || this.model.phone){
                this.model.event = vm.course._id;
                orderService.post(this.model)
                    .then(function(){
                        that.hideForm();
                    })
                    .catch(function(err){
                        $log.error(err);
                    });
            }
        }
        
        $routeParams.name = '570ff80671392d4a073626bd';
        
        courseService.get($routeParams.name).then(function(course){
            vm.course = course;
            vm.order = order;
        }).catch(function(err){
            $log.error(err);
        });
    }
})();