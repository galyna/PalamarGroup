import {LeftSidenavComponentName} from "./left.sidenav.component";
let template = `<md-toolbar class="md-hue-2">
    <div class="md-toolbar-tools">
        <md-button hide-gt-sm="true" ng-click="$ctrl.toggleLeftSidenav()" class="md-icon-button" aria-label="Settings">
            <md-icon md-svg-src="navigation:ic_menu_24px"></md-icon>
        </md-button>
        <h2><a ng-href="/">Palamar Group</a></h2>
        <!--<input type="text" placeholder="search">-->
        <span flex></span>
        <span ng-if="$root.user">{{$root.user.email}} <md-button ng-click="$root.logout()">Logout</md-button></span>
        <span ng-if="!$root.user"><md-button ng-click="$root.login()">Login</md-button></span>
    </div>
</md-toolbar>`;

export class HeaderComponentController {

    static $inject = ['$mdSidenav','$location'];

    constructor(private $mdSidenav: ng.material.ISidenavService,private $location:ng.ILocationService){

    }

    
    toggleLeftSidenav(){
        this.$mdSidenav(LeftSidenavComponentName)
            .toggle();
    }
}

export let HeaderComponentName = 'pgAdminHeader';
export let HeaderComponentOptions = {
    template: template,
    controller: HeaderComponentController
};