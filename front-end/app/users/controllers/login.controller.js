/**
 * Created by Galyna on 16.03.2016.
 */
(function () {

    angular
        .module('users')
        .controller('LoginController', ['$mdDialog', '$log', 'LoginService','userService', '$location', LoginController
        ]);

    /**
     * Controller for Login
     * @param $mdDialog
     * @param $log
     * @constructor
     */
    function LoginController($mdDialog, $log, LoginService, userService, $location) {
        var vm = this;

        vm.registationModel = {
            password: 'admin',
            email: 'admin@admin.com',
            password_c: 'admin'
        };
        vm.loginModel = {
            password: 'admin',
            email: 'admin@admin.com'
        };

        vm.cancel = function () {
            $mdDialog.hide();
        };

        vm.login = function (form) {
            $log.debug("login()...");

            if (form.$valid) {
                LoginService.login(vm.loginModel).then(function (user) {
                    $log.debug("success   login ..." + user.email + "" + user.id);
                    $location.path('/profile');
                    $mdDialog.hide();
                }, function () {
                    $log.debug("fail...");
                })
            }

        };

        vm.register = function (form) {
            $log.debug("register()...");
            if (form.$valid) {
                userService.post(vm.registationModel).then(function (user) {
                    $log.debug("success   register ..." + user.email + "" + user._id);
                    $mdDialog.hide();
                }, function () {
                    $log.debug("fail...");
                })
            }


        };

        vm.user = {
            password: 'password',
            email: 'ostapradio@gmail.com',
            password_c: 'password'
        };
    }

})();

