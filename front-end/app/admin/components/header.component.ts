import {LeftSidenavComponentName} from "./left.sidenav.component";
let template = `<md-toolbar class="md-hue-2">
    <div class="md-toolbar-tools">
        <md-button ng-if="!$mdMedia('gt-sm')" ng-click="$ctrl.toggleLeftSidenav()" class="md-icon-button" aria-label="Settings">
            <md-icon md-svg-src="navigation:ic_menu_24px"></md-icon>
        </md-button>
        <h2>Palamar Group</h2>
        <input type="text" placeholder="search">
        <span flex></span>
        <span>Login|Logout</span>
    </div>
</md-toolbar>`;

export class HeaderComponentController {

    static $inject = ['$mdSidenav'];

    constructor(private $mdSidenav: ng.material.ISidenavService){

    }
    
    toggleLeftSidenav(){
        this.$mdSidenav(LeftSidenavComponentName)
            .toggle()
            .then(function () {
                // $log.debug("close LEFT is done");
            });
    }
}

export let HeaderComponentName = 'pgAdminHeader';
export let HeaderComponentOptions = {
    template: template,
    controller: HeaderComponentController
};