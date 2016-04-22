(function(){
    angular.module('courses')
        .controller('TestController', TestController);
    
    TestController.$inject = ['mediaObserver', 'courseService'];
    function TestController(mObserver, courseService){
        var vm = this;
        
        // courseService.get('570e9fe813bb7a0c1d01fc84').then(function(course){
        //     vm.items = course.hearFormsPhotos;
        //     mObserver.observe(vm.items);
        // });

        vm.items = [
            {url: '/api/photo/test_width.jpeg'},
            {url: '/api/photo/test_height.jpeg'},
            {url: '/api/photo/test_small.jpeg'},
            {url: '/api/photo/test_big.jpeg'}
        ];

        mObserver.observe(vm.items);
        // function random(max){
        //     var min = 0.5;
        //     var rand = Math.random();
        //     rand = rand < min ? rand + min : rand;
        //     return  Math.floor(rand * max);
        // }
    }
})();