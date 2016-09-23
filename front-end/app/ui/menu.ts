import {CourseCalendarComponentUrl} from "../courses/components/course.calendar.component";
import {SalonHomeComponentUrl} from "../salon/components/salon.home.component";
import {AcademyContactComponentUrl} from "../courses/components/academy.contacts.component";
import {IConstants} from "../core/core.config";
import {IRootScope} from "../../typings";

const template = `<div id="nav-icon4" ng-click="$ctrl.toggleMenu($event)">
  <span></span>
  <span></span>
  <span></span>
</div>
   
`;
const menuBtnSelector = "#nav-icon4";

const dialogTemplate = `<md-dialog class="menu-dialog " aria-label="menu" layout="column" layout-align="center stretch"

>
  <div class="pg-menu-section" ng-if="vm.showSalon">
        <div class="pg-menu-section-title" ng-click="vm.courses()">САЛОН</div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="vm.goToURL(vm.SalonHomeComponentUrl)" class=" pg-menu-item ">ГОЛОВНА

            </div>
            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">ПОСЛУГИ

            </div>

            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">КОМАНДА
            </div>
            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">ПРАЙС

            </div>
            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">ПЕРЕВТІЛЕННЯ

            </div>
   
            <div flex ng-click="vm.goToURL(SalonHomeComponentUrl)" class=" pg-menu-item ">КОНТАКТИ

            </div>
        </div>
    </div>
    <div class=" pg-menu-section">
        <div class="pg-menu-section-title" ng-click="vm.courses()">АКАДЕМІЯ</div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="vm.goToURL('/courses')" class=" pg-menu-item ">НАВЧАЛЬННЯ

            </div>

            <div flex ng-click="vm.goToURL(vm.CourseCalendarComponentUrl)" class=" pg-menu-item ">КАЛАЕНДАР
            </div>
        <div flex ng-click="vm.goToURL(vm.AcademyContactComponentUrl)" class=" pg-menu-item ">КОНТАКТИ

            </div>
     
        </div>
    </div>

</md-dialog>
    `;

export class MenuComponentController {

    static $inject = ['$mdDialog', '$location', 'constants', 'smoothScroll','$rootScope'];
    static componentName = 'MenuComponentController';

    showSalon:boolean
    SalonHomeComponentUrl = SalonHomeComponentUrl;
    CourseCalendarComponentUrl = CourseCalendarComponentUrl;
    AcademyContactComponentUrl = AcademyContactComponentUrl;

    constructor(private mdDialog:ng.material.IDialogService, private $location,
                private constants:IConstants, private smoothScroll,private $rootScope:IRootScope) {
        this.showSalon = constants.showSalon;
    }

    scrollToMain() {
        var options = {
            duration: 400,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById( 'mainContent' );
        this.smoothScroll( element, options );
    }

    goToURL(url):void {
        this.$location.url( url );
        this.mdDialog.hide().then( ()=> {
            this.scrollToMain();
        } );
        ;
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