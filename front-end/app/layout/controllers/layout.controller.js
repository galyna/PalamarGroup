/**
 * Created by Galyna on 16.03.2016.
 */
(function () {

    angular
        .module('layout')
        .controller('LayoutController', ['$mdDialog', '$mdSidenav', '$templateCache', LayoutController
        ]);

    /**
     * Main Controller for the  App
     * @param $mdDialog
     * @constructor
     */
    function LayoutController($mdDialog, $mdSidenav, $templateCache) {
        var vm = this;

        vm.showLogin = showLogin;
        vm.showRegistration = showRegistration;
        vm.toggleLeftMenu = toggleLeftMenu;
        vm.artists = [
            {
                icon: "../content/images/pop/Rihanna.jpg",
                title: "Rihanna"
            },
            {
                icon: "../content/images/pop/Lady Gaga.jpg",
                title: "Lady Gaga"
            }, {
                icon: "../content/images/pop/Selena Gomez.jpg",
                title: "Selena Gomez"
            },
            {
                icon: "../content/images/pop/Madonna.jpg",
                title: "Madonna",

            }, {
                icon: "../content/images/pop/Mariah Carey.jpg",
                title: "Mariah Carey ",

            },
            {
                icon: "../content/images/pop/Christina Aguilera.jpg",
                title: "Christina Aguilera",

            },
            {
                icon: "../content/images/pop/Taylor Swift.jpg",
                title: "Taylor Swift"
            },
            {
                icon: "../content/images/pop/Adele.jpg",
                title: "Adele"
            }, {
                icon: "../content/images/pop/Britney Spears.jpg",
                title: "Britney Spears",
            },
            {
                icon: "../content/images/pop/Katy Perry.jpg",
                title: "Katy Perry",

            }, {
                icon: "../content/images/pop/Jennifer Lopez.jpg",
                title: "Jennifer Lopez ",

            },
            {
                icon: "../content/images/pop/Avril Lavigne.jpg",
                title: " Avril Lavigne",

            }];
        vm.artists1 = vm.artists.slice().sort();
        vm.artists2 = vm.artists.slice().reverse() ;

        function toggleLeftMenu() {
            $mdSidenav('left').toggle();
        }

        function showRegistration() {
            $mdDialog.show({
                controller: 'LoginController',
                controllerAs: "vm",
                template: $templateCache.get('users/views/registration.form.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
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

