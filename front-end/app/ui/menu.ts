import {CourseCalendarComponentUrl} from "../courses/components/course.calendar.component";
import {SalonHomeComponentUrl} from "../salon/components/salon.home.component";
import {ProductsComponentUrl} from "../salon/components/products.component";
import {AcademyContactComponentUrl} from "../courses/components/academy.contacts.component";
import {SalonContactsComponentUrl} from "../salon/components/salon.contacts.component";
import {SalonTransformsComponentUrl} from "../salon/components/salon.transforms.component";

import {MastersComponentUrl} from "../salon/components/masters.component";
import {AcademyVideoComponentUrl} from "../courses/components/academy.video.component";


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
        <div layout="column">
            <div layout="row" layout-xs="column">
                <div flex ng-click="::vm.goToURL(vm.SalonHomeComponentUrl)" class=" pg-menu-item ">ГОЛОВНА
                </div>

                <div flex ng-click="::vm.goToURL(vm.MastersComponentUrl)" class=" pg-menu-item ">КОМАНДА
                </div>

                <div flex ng-click="::vm.goToURL('/beauty-salon/products/products')" class=" pg-menu-item ">ПРОДУКЦІЯ
                </div>

            </div>
            <div layout="row" layout-xs="column">
                <div flex ng-click="::vm.goToURL('/beauty-salon/services/hairdressing')"
                     class=" pg-menu-item ">ПЕРУКАРСЬКІ ПОСЛУГИ
                </div>
                <div flex ng-click="::vm.goToURL('/beauty-salon/services/hearhealing')" 
                    class=" pg-menu-item ">ЛІКУВАННЯ ВОЛОССЯ
                </div>
                <div flex ng-click="::vm.goToURL(vm.SalonTransformsComponentUrl)" 
                    class=" pg-menu-item ">ЗМІНА ОБРАЗУ
                </div>
            </div>
            <div layout="row" layout-xs="column">
                <div flex ng-click="::vm.goToAbsURL('/certificates.html')" class=" pg-menu-item">Подарункові сертифікати</div>
                <div flex ng-click="::vm.goToURL(vm.SalonContactsComponentUrl)" class=" pg-menu-item ">КОНТАКТИ</div>
                <div flex ng-click="::vm.goToAbsURL('/vacancies.html')" class=" pg-menu-item ">ВАКАНСІЇ</div>
            </div>
        </div>

    </div>
    <div class=" pg-menu-section">
        <div class="pg-menu-section-title" ng-click="::vm.goToURL('/academy')">АКАДЕМІЯ</div>
        <div layout="column" layout-gt-sm="row">
            <div flex ng-click="::vm.goToURL('/academy')" class=" pg-menu-item ">ПРОГРАМА
            </div>
            <div flex ng-click="::vm.goToURL(vm.CourseCalendarComponentUrl)" class=" pg-menu-item ">КАЛЕНДАР
            </div>
            <div flex ng-click="::vm.goToURL(vm.AcademyVideoComponentUrl)" class=" pg-menu-item ">ВІДЕО
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

    showSalon: boolean;
    SalonHomeComponentUrl = SalonHomeComponentUrl;
    CourseCalendarComponentUrl = CourseCalendarComponentUrl;
    AcademyContactComponentUrl = AcademyContactComponentUrl;
    ProductsComponentUrl = ProductsComponentUrl;
    SalonContactsComponentUrl = SalonContactsComponentUrl;
    SalonTransformsComponentUrl = SalonTransformsComponentUrl;
    MastersComponentUrl = MastersComponentUrl;
    AcademyVideoComponentUrl = AcademyVideoComponentUrl;


    constructor(private mdDialog: ng.material.IDialogService, private $location: ng.ILocationService,
                private constants: IConstants, private smoothScroll, private $rootScope: IRootScope) {
        this.showSalon = constants.showSalon;
    }

    scrollToMain() {
        var options = {
            duration: 1,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    goToAbsURL(url): void {
        window.location.href = url
    }

    goToURL(url): void {
        this.$location.url(url);
        this.mdDialog.hide().then(()=> {
            if(url==SalonHomeComponentUrl){
            this.scrollToMain();}
        });
        var menuBtn = angular.element(document.getElementById('menu-container'));
        menuBtn.css('z-index', 80);
        angular.element(document.querySelector(menuBtnSelector)).toggleClass('open');
    }


    toggleMenu($event): void {
        var menuBtn = angular.element($event.currentTarget);

        if (!menuBtn.hasClass('open')) {
            this.mdDialog.show({
                template: dialogTemplate,
                              bindToController: true,
                controller: MenuComponentOptions.controller,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                targetEvent: $event,
                fullscreen: true
            });
          menuBtn.css('z-index', 81);
            menuBtn.toggleClass('open');
        } else {
            menuBtn.css('z-index', 80);
            this.mdDialog.hide();

            menuBtn.toggleClass('open');
        }

    }
}

export let MenuComponentUrl = "";
export let MenuComponentName = 'pgMenu';
export let MenuComponentOptions = {
    template: template,
    controller: MenuComponentController
};
