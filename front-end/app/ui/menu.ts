const template = `<div id="nav-icon4" ng-click="$ctrl.toggleMenu($event)">
  <span></span>
  <span></span>
  <span></span>
</div>
   
`;
const menuBtnSelector = "#nav-icon4";

const dialogTemplate = `<md-dialog class="menu-dialog " aria-label="menu" layout="column" layout-align="center center">
  
    <div ng-click="vm.courses()" class=" pg-menu-item md-display-3">БЛОКИ
    
    </div>
    
    <div ng-click="vm.calendar()" class=" pg-menu-item md-display-3">КАЛАНДАР
  
    </div>
    

</md-dialog>
    `;

export class MenuComponentController {

    static $inject = ['$mdDialog', '$location'];
    static componentName = 'MenuComponentController';


    constructor(private mdDialog:ng.material.IDialogService, private $location) {

    }


    courses():void {
        this.$location.url( '/course' );
        this.mdDialog.hide();
        angular.element( document.querySelector( menuBtnSelector ) ).toggleClass( 'open' );
    }

    calendar():void {
        this.$location.url( '/courses' );
        this.mdDialog.hide();
        angular.element( document.querySelector( menuBtnSelector ) ).toggleClass( 'open' );
    }

    toggleMenu($event):void {
        var menuBtn = angular.element( $event.currentTarget );

        if (!menuBtn.hasClass( 'open' )) {
            this.mdDialog.show( {
                template: dialogTemplate,
                clickOutsideToClose: true,
                bindToController: true,
                controller: MenuComponentOptions.controller,
                controllerAs: 'vm',
                parent: angular.element( document.body ),
                targetEvent: $event,
                fullscreen: true
            } );
            menuBtn.toggleClass( 'open' );
        } else {
            this.mdDialog.hide();
            menuBtn.toggleClass( 'open' );
        }

    }
}

export let MenuComponentUrl = "";
export let MenuComponentName = 'pgMenu';
export let MenuComponentOptions = {
    template: template,
    controller: MenuComponentController
};