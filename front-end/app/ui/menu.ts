import {CourseCalendarComponentUrl} from "../courses/components/course.calendar.component";
import {SalonHomeComponentUrl} from "../salon/components/salon.home.component";

const template = `<div id="nav-icon4" ng-click="$ctrl.toggleMenu($event)">
  <span></span>
  <span></span>
  <span></span>
</div>
   
`;
const menuBtnSelector = "#nav-icon4";

const dialogTemplate = `<md-dialog class="menu-dialog " aria-label="menu" layout="column" layout-align="center stretch"

>
   <!-- <div class="pg-menu-section">
        <div class="pg-menu-section-title" ng-click="vm.courses()">САЛОН</div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">ГОЛОВНА

            </div>
            <div flex ng-click="vm.courses()" class=" pg-menu-item ">ПОСЛУГИ

            </div>

            <div flex ng-click="vm.calendar()" class=" pg-menu-item ">КОМАНДА
            </div>
            <div flex ng-click="vm.calendar()" class=" pg-menu-item ">ПРАЙС

            </div>
            <div flex ng-click="vm.calendar()" class=" pg-menu-item ">ПЕРЕВТІЛЕННЯ

            </div>
   
            <div flex ng-click="vm.calendar()" class=" pg-menu-item ">КОНТАКТИ

            </div>
        </div>
    </div>-->
    <div class=" pg-menu-section">
        <div class="pg-menu-section-title" ng-click="vm.courses()"></div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="vm.courses()" class=" pg-menu-item ">НАВЧАЛЬННЯ

            </div>

            <div flex ng-click="vm.calendar()" class=" pg-menu-item ">КАЛАЕНДАР
            </div>
            <!-- <div flex ng-click="vm.calendar()" class=" pg-menu-item ">КОНТАКТИ

            </div>-->
     
        </div>
    </div>

</md-dialog>
    `;

export class MenuComponentController {

    static $inject = ['$mdDialog', '$location'];
    static componentName = 'MenuComponentController';


    constructor(private mdDialog:ng.material.IDialogService, private $location) {

    }

    goToURL(url):void {
        this.$location.url( SalonHomeComponentUrl );
        this.mdDialog.hide();
        angular.element( document.querySelector( menuBtnSelector ) ).toggleClass( 'open' );
    }
    courses():void {
        this.$location.url( '/course' );
        this.mdDialog.hide();
        angular.element( document.querySelector( menuBtnSelector ) ).toggleClass( 'open' );
    }

    calendar():void {
        this.$location.url( CourseCalendarComponentUrl );
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