let template = `<md-sidenav
        md-component-id="pgLeftSidenav"
        md-is-locked-open="$mdMedia('gt-sm')"
        hide-print
        class="md-sidenav-left">
    <ul>
        <li ng-repeat="item in ::$ctrl.items">
            <span ng-if="item.items">
                <button class="md-button md-ink-ripple" ng-bind="item.text" ng-click="item.opened = !item.opened">
                    <md-icon md-svg-src="navigation:ic_expand_more_24px"></md-icon>          
                </button>
            </span>
            <span ng-if="!item.items" ng-click="$ctrl.goTo(item)">
                <button class="md-button md-ink-ripple" ng-bind="item.text"></button>
            </span>
            <ul ng-if="item.items && item.opened">
                <li ng-repeat="item in ::item.items" ng-click="$ctrl.goTo(item)">
                    <button class="md-button md-ink-ripple" ng-bind="item.text"></button>
                </li>
            </ul>
        </li>
    </ul>
</md-sidenav>`;

export class LeftSidenavComponentController {

    static $inject = ['$location','$route'];

    componentId: string;
    items: any[];

    constructor(private $location:ng.ILocationService,private $route) {
        this.componentId = LeftSidenavComponentName;
        this.items = [
            {
                text: 'Академія',
                opened: true,
                items: [
                    {
                        text: 'Курси',
                        url: '/academy/courses'
                    },
                    {
                        text: 'Записи',
                        url: '/academy/orders'
                    },
                    {
                        text: 'Моделі',
                        url: '/academy/models'
                    },
                    {
                        text: 'Розсилка',
                        url: '/academy/delivery'
                    },
                    {
                        text: 'Контакти',
                        url: '/academy/contacts'
                    },
                    {
                        text: 'Відгуки',
                        url: '/academy/comments'
                    },
                ]
            },

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