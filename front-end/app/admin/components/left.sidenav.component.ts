import {ItServiceName, ItService} from "../../users/services/it.service";
import {usersComponentUrl} from "./users.component";
import {SeosComponentUrl} from "./seos.component";
import {IConstants} from "../../core/core.config";

import {MastersComponentUrl} from "../../admin/salon/components/masters.component";
import {FavorsComponentUrl} from "../../admin/salon/components/favors.component";
import {TransformsComponentUrl} from "../../admin/salon/components/transforms.component";
import {AppointmentsComponentUrl} from "../../admin/salon/components/appointments.component";
import {BrendsComponentUrl} from "../../admin/salon/components/brends.component";
import {ProductsComponentUrl} from "../../admin/salon/components/products.component";
import {ProductOrdersComponentUrl} from "../../admin/salon/components/product.orders.component";
import {SalonsComponentUrl} from "../../admin/salon/components/salons.component";
import {SalonContactsComponentUrl} from "../../admin/salon/components/contacts.component";

import {AdminCoursesComponentUrl} from "../../admin/academy/components/courses.component";
import {AdminOrdersComponentUrl} from "../../admin/academy/components/orders.component";
import {CommentsComponentUrl} from "../../admin/academy/components/comments.component";
import {ContactsComponentUrl} from "../../admin/academy/components/contacts.component";
import {VideosComponentUrl} from "../../admin/academy/components/videos.component";


let template = `<md-sidenav
        md-component-id="pgLeftSidenav"
        md-is-locked-open="$mdMedia('gt-sm')"
        hide-print
        class="md-sidenav-left">
    <ul class="pg-left-sidenav">
        <li ng-repeat="item in ::$ctrl.items" ng-if="item.visible()">
            <span ng-if="item.items">
                <button class="md-button md-ink-ripple" ng-bind="item.text" ng-click="$ctrl.goToRoot(item)">
                    <md-icon md-svg-src="navigation:ic_expand_more_24px"></md-icon>          
                </button>
            </span>
            <span ng-if="!item.items" ng-click="$ctrl.goTo(item)" ng-class="{active:$ctrl.active(item)}">
                <button class="md-button md-ink-ripple" ng-bind="item.text"></button>
            </span>
            <ul ng-if="item.items && item.opened && item.visible()">
                <li ng-repeat="item in ::item.items" ng-click="$ctrl.goTo(item)"  ng-class="{active:$ctrl.active(item)}">
                    <button class="md-button md-ink-ripple pg-subitem" ng-bind="item.text"></button>
                </li>
            </ul>
        </li>
    </ul>
</md-sidenav>`;

export class LeftSidenavComponentController {

    static $inject = ['$mdSidenav', '$location', '$route', ItServiceName, 'constants'];

    componentId: string;
    items: any[];
    showSalon: boolean;

    constructor(private $mdSidenav: ng.material.ISidenavService,
                private $location: ng.ILocationService, private $route: ng.route.IRouteService,
                public it: ItService, private constants: IConstants) {
        this.componentId = LeftSidenavComponentName;
        this.showSalon = constants.showSalon;

        this.items = [
            {
                text: 'Академія',
                opened: this.it.is('academyUser'),
                visible: ()=> {
                    return this.it.is('academyUser')
                },
                items: [
                    {
                        text: 'Курси',
                        url: AdminCoursesComponentUrl,
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Відео',
                        url: VideosComponentUrl,
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Записи',
                        url: AdminOrdersComponentUrl,
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
                        text: 'Контакти',
                        url: ContactsComponentUrl,
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Відгуки',
                        url: CommentsComponentUrl,
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
                    }

                ]
            },
            {
                text: 'Салон',
                opened: this.it.is('salonUser'),
                visible: ()=> {
                    return this.it.is('salonUser')
                },
                items: [
                    {
                        text: 'Записи на прийом',
                        visible: () => true,
                        url: AppointmentsComponentUrl,
                    }, {
                        text: 'Майстри',
                        visible: () => true,
                        url: MastersComponentUrl,
                    },
                    {
                        text: 'Послуги',
                        visible: () => true,
                        url: FavorsComponentUrl,
                    }
                    , {
                        text: 'Перевтілення',
                        visible: () => true,
                        url: TransformsComponentUrl,
                    },
                    {
                        text: 'Продукція',
                        visible: () => true,
                        url: ProductsComponentUrl,
                    }
                    ,
                    {
                        text: 'Замовлення Продукції',
                        visible: () => true,
                        url: ProductOrdersComponentUrl,
                    }
                    ,
                    {
                        text: 'Бренди',
                        visible: () => true,
                        url: BrendsComponentUrl,
                    },
                    {
                        text: 'Контакти',
                        url: SalonContactsComponentUrl,
                        visible: ()=> {
                            return true;
                        }
                    },
                    {
                        text: 'Салони',
                        url: SalonsComponentUrl,
                        visible: ()=> {
                            return true;
                        }
                    },
                ]
            },
            {
                text: 'SEO',
                url: SeosComponentUrl,
                visible: ()=> {
                    return this.it.is('admin');
                }
            },
            {
                text: 'Користувачі',
                url: usersComponentUrl,
                visible: ()=> {
                    return this.it.is('admin');
                }
            }

        ]
    }

    goToRoot(item) {
        item.opened = !item.opened;
        if (item.opened) {
            this.items.forEach((it)=> {
                if (it.text !== item.text) {
                    it.opened = false;
                }
            })
        }

    }

    goTo(item) {
        if (!item.url) return;
        this.$location.url(item.url);
        this.$route.reload();
        this.$mdSidenav(LeftSidenavComponentName).close();
    }

    active(item) {
        return item.url === this.$location.path();
    }

}

export let LeftSidenavComponentName = 'pgLeftSidenav';
export let LeftSidenavComponentOptions = {
    template: template,
    controller: LeftSidenavComponentController
};