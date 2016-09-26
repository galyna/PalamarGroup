import {ItServiceName, ItService} from "../../users/services/it.service";
import {usersComponentUrl} from "./users.component";
import {IConstants} from "../../core/core.config";
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

    static $inject = ['$location', '$route', ItServiceName, 'constants'];

    componentId:string;
    items:any[];
    showSalon:boolean;

    constructor(private $location:ng.ILocationService, private $route,
                public it:ItService, private constants:IConstants) {
        this.componentId = LeftSidenavComponentName;
        this.showSalon = constants.showSalon;

        this.items = [
            {
                text: 'Академія',
                opened: this.it.is( 'academyUser' ),
                visible: ()=> {
                    return this.it.is( 'academyUser' )
                },
                items: [
                    {
                        text: 'Курси',
                        url: '/academy/courses',
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Записи',
                        url: '/academy/orders',
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Моделі',
                        url: '/academy/models',
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Розсилка',
                        url: '/academy/delivery',
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Контакти',
                        url: '/academy/contacts',
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Відгуки',
                        url: '/academy/comments',
                        visible: ()=> {
                            return true;
                        }
                    }
                ]
            },
            {
                text: 'Салон',
                opened: this.it.is( 'salonUser' ),
                visible: ()=> {
                    return this.it.is( 'salonUser' ) && this.showSalon
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
                visible: ()=> {
                    return this.it.is( 'admin' ) ;
                }
            }

        ]
    }

    goTo(item) {
        if (!item.url) return;
        this.$location.url( item.url );
        this.$route.reload();
    }

}

export let LeftSidenavComponentName = 'pgLeftSidenav';
export let LeftSidenavComponentOptions = {
    template: template,
    controller: LeftSidenavComponentController
};