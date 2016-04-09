/**
 * Created by Galyna on 08.04.2016.
 */
(function () {

    angular
        .module('admin')
        .controller('AdminController', ['$mdDialog', '$mdSidenav', '$templateCache', AdminController
        ]);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    function AdminController($mdDialog, $mdSidenav, $templateCache) {
        var vm = this;

        vm.showLogin = showLogin;
        vm.toggleLeftMenu = toggleLeftMenu;
        
        function toggleLeftMenu() {
            $mdSidenav('left').toggle();
        }

        /**
         * Show Login dialog
         */
        function showLogin() {
            $mdDialog.show({
                controller: 'LoginController',
                controllerAs: "vm",
                template: $templateCache.get('users/views/login.form.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }
    }
})();


