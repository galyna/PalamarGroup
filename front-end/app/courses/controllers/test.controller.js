(function(){
    angular.module('courses')
        .controller('TestController', TestController);
    
    TestController.$inject = [];
    function TestController(){
        var vm = this;

        vm.items = ['one', 'two', 'three', 'four', 'five'];
        vm.customOptions = {
            autoplayTimeout: 1000
        }
    }
})();