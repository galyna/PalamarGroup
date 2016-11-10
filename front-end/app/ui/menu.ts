import {CourseCalendarComponentUrl} from "../courses/components/course.calendar.component";
import {SalonHomeComponentUrl} from "../salon/components/salon.home.component";
import {ProductsComponentUrl} from "../salon/components/products.component";
import {AcademyContactComponentUrl} from "../courses/components/academy.contacts.component";
import {SalonContactsComponentUrl} from "../salon/components/salon.contacts.component";
import {SalonTransformsComponentUrl} from "../salon/components/salon.transforms.component";
import {FavorsComponentUrl} from "../salon/components/favors.component";
import {MastersComponentUrl} from "../salon/components/masters.component";


import {IConstants} from "../core/core.config";
import {IRootScope} from "../../typings";

const template = `<div   ng-click="::$ctrl.toggleMenu($event)" id="menu-container" >
    <div id="nav-icon4" >
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div hide show-gt-xs="true" class="menu-label" layout="row" layout-align="center center " >
        МЕНЮ
    </div>
</div>
   
`;
const menuBtnSelector = "#menu-container";

const dialogTemplate = `<md-dialog class="menu-dialog " aria-label="menu" layout="column" layout-align="center stretch"

>
    <div class="pg-menu-section" ng-if="::vm.showSalon">
        <div class="pg-menu-section-title" ng-click="::vm.goToURL(vm.SalonHomeComponentUrl)">САЛОН</div>
         <div layout="column" >
            <div layout="row" layout-xs="column">
            <div flex ng-click="::vm.goToURL(vm.SalonHomeComponentUrl)" class=" pg-menu-item ">ГОЛОВНА
            </div>
            <div flex ng-click="::vm.goToURL(vm.FavorsComponentUrl)" class=" pg-menu-item ">ПОСЛУГИ
            </div>
            <div flex ng-click="::vm.goToURL(vm.MastersComponentUrl)" class=" pg-menu-item ">МАЙСТРИ
            </div>
           
        </div>
            <div layout="row" layout-xs="column">
           
            <div flex ng-click="::vm.goToURL(vm.SalonTransformsComponentUrl)" class=" pg-menu-item ">ПЕРЕВТІЛЕННЯ
            </div>
            <div flex ng-click="::vm.goToURL(vm.ProductsComponentUrl)" class=" pg-menu-item ">ПРОДУКЦІЯ
            </div>
            <div flex ng-click="::vm.goToURL(vm.SalonContactsComponentUrl)" class=" pg-menu-item ">КОНТАКТИ
            </div>
        </div>
        </div>
       
    </div>
    <div class=" pg-menu-section">
        <div class="pg-menu-section-title" ng-click="::vm.goToURL('/courses')">АКАДЕМІЯ</div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="::vm.goToURL('/courses')" class=" pg-menu-item ">НАВЧАЛЬННЯ
            </div>
            <div flex ng-click="::vm.goToURL(vm.CourseCalendarComponentUrl)" class=" pg-menu-item ">КАЛАЕНДАР
            </div>
            <div flex ng-click="::vm.goToURL(vm.AcademyContactComponentUrl)" class=" pg-menu-item ">КОНТАКТИ
            </div>
        </div>
    </div>

</md-dialog>
    `;

export class MenuComponentController {

    static $inject = ['$mdDialog', '$location', 'constants', 'smoothScroll', '$rootScope'];
    static componentName = 'MenuComponentController';

    showSalon:boolean
    SalonHomeComponentUrl = SalonHomeComponentUrl;
    CourseCalendarComponentUrl = CourseCalendarComponentUrl;
    AcademyContactComponentUrl = AcademyContactComponentUrl;
    ProductsComponentUrl = ProductsComponentUrl;
    SalonContactsComponentUrl = SalonContactsComponentUrl;
    SalonTransformsComponentUrl = SalonTransformsComponentUrl;
    FavorsComponentUrl = FavorsComponentUrl;
    MastersComponentUrl=MastersComponentUrl;
    

    constructor(private mdDialog:ng.material.IDialogService, private $location,
                private constants:IConstants, private smoothScroll, private $rootScope:IRootScope) {
        this.showSalon = constants.showSalon;
    }

    scrollToMain() {
        var options = {
            duration: 200,
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
            menuBtn.css('z-index',81);
            menuBtn.toggleClass( 'open' );
        } else {

            this.mdDialog.hide();
            menuBtn.css('z-index',80);
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