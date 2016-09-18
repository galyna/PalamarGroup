import {ItServiceName, ItService} from "../../users/services/it.service";
import {usersComponentUrl} from "./users.component";
let template = `<md-sidenav
        md-component-id="pgLeftSidenav"
        md-is-locked-open="$mdMedia('gt-sm')"
        hide-print
        class="md-sidenav-left">
    <ul>
        <li ng-repeat="item in ::$ctrl.items" ng-if="item.visible()">
            <span ng-if="item.items">
                <button class="md-button md-ink-ripple" ng-bind="item.text" ng-click="item.opened = !item.opened">
                    <md-icon md-svg-src="navigation:ic_expand_more_24px"></md-icon>          
                </button>
            </span>
            <span ng-if="!item.items" ng-click="$ctrl.goTo(item)">
                <button class="md-button md-ink-ripple" ng-bind="item.text"></button>
            </span>
            <ul ng-if="item.items && item.opened && item.visible()">
                <li ng-repeat="item in ::item.items" ng-click="$ctrl.goTo(item)">
                    <button class="md-button md-ink-ripple" ng-bind="item.text"></button>
                </li>
            </ul>
        </li>
    </ul>
</md-sidenav>`;

export class LeftSidenavComponentController {

    static $inject = ['$location','$route',ItServiceName];

    componentId: string;
    items: any[];

    constructor(private $location:ng.ILocationService,private $route, public it: ItService) {
        this.componentId = LeftSidenavComponentName;
        this.items = [
            {
                text: 'Академія',
                opened: true,
                visible: ()=>{
                    return this.it.is('academyUser')
                },
                items: [
                    {
                        text: 'Курси',
                        url: '/academy/courses',
                        visible: ()=>{
                            return true;
                        }
                    },
                    {
                        text: 'Записи',
                        url: '/academy/orders',
                        visible: ()=>{
                            return true;
                        }
                    },
                    {
                        text: 'Моделі',
                        url: '/academy/models',
                        visible: ()=>{
                            return true;
                        }
                    },
                    {
                        text: 'Розсилка',
                        url: '/academy/delivery',
                        visible: ()=>{
                            return true;
                        }
                    },
                    {
                        text: 'Контакти',
                        url: '/academy/contacts',
                        visible: ()=>{
                            return true;
                        }
                    },
                    {
                        text: 'Відгуки',
                        url: '/academy/comments',
                        visible: ()=>{
                            return true;
                        }
                    }
                ]
            },
            {
                text: 'Салон',
                opened: false,
                visible: ()=> {
                    return this.it.is('salonUser')
                },
                items: [
                    {
                        text: 'Майстри',
                        visible: () => true,
                        url: '/salon/masters',
                    },
                    {
                        text: 'Послуги',
                        visible: () => true,
                        url: '/salon/favors',
                    }
                ]
            },
            {
                text: 'Користувачі',
                url: usersComponentUrl,
                visible: ()=>{
                    return this.it.is('admin');
                }
            }

        ]
    }

    goTo(item){
        if(!item.url) return;
        this.$location.url(item.url);
        this.$route.reload();
    }

    navToCources():void {
        this.$location.url('/academy/courses');
        this.$route.reload();
    }

    navToOrders():void {
        this.$location.url('/academy/orders');
        this.$route.reload();
    }

    navToModels():void {
        this.$location.url('/academy/models');
        this.$route.reload();
    }

    navToDelivery():void {
        this.$location.url('/academy/delivery');
        this.$route.reload();
    }

    navToContacts():void {
        this.$location.url('/academy/contacts');
        this.$route.reload();
    }


    navToComments():void {
        this.$location.url('/academy/comments');
        this.$route.reload();
    }
}

export let LeftSidenavComponentName = 'pgLeftSidenav';
export let LeftSidenavComponentOptions = {
    template: template,
    controller: LeftSidenavComponentController
};