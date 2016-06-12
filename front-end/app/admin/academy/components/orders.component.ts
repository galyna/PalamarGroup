import {IOrderResource, IOrder} from "../../../resources/order.resource";
let template = `
<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="order in $ctrl.orders" ng-click="$ctrl.showEditOrderDialog($event, order)">
        <div class="md-list-item-text" layout="column">
            <h3>{{::order.name||'Анонім'}} {{::order.phone||order.email}}</h3>
            <p>{{::$ctrl.getOrderTitle(order)}}</p>
        </div>
        <md-checkbox class="md-secondary" ng-model="order.answered" ng-click="$ctrl.saveOrder(order)"></md-checkbox>
        <md-icon class="md-secondary" ng-click="$ctrl.showEditOrderDialog($event, order)" md-svg-icon="communication:ic_message_24px"></md-icon>
        <!--<md-icon class="md-secondary" md-svg-icon="action:ic_delete_24px"></md-icon>-->
        <md-divider></md-divider>
    </md-list-item>
    <p><a ng-click="$ctrl.loadMore()" class="more-link">Показати більше</a></p>
</md-list>
`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>{{$ctrl.order.event_name}}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
            
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">
                <md-subheader flex="1">
                    <p>{{$ctrl.order.date|date}}</p>
                    <p ng-if="$ctrl.order.name">
                        {{$ctrl.order.name}}
                    </p>
                    <p ng-if="$ctrl.order.phone">
                        {{$ctrl.order.phone}}
                    </p>
                    <p ng-if="$ctrl.order.email">
                        {{$ctrl.order.email}}
                    </p>
                    <p ng-if="$ctrl.order.comment">
                        {{$ctrl.order.comment}}
                    </p>
                </md-subheader>
                <div flex="2">
                    <md-checkbox ng-model="$ctrl.order.answered">Оброблено</md-checkbox>
                    <md-checkbox ng-model="$ctrl.order.booked">Booked</md-checkbox>
                    <md-input-container>
                        <label>Admin comment</label>
                        <textarea ng-model="$ctrl.order.adminComment"></textarea>
                    </md-input-container>
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Cancel
            </md-button>
            <md-button type="submit" aria-label="save">
                Save
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;

class EditOrderDialogController {

    private order: IOrder;
    private originalOrder: IOrder;
    constructor(private $mdDialog:ng.material.IDialogService, order:IOrder){
        this.order = angular.copy(order);
        this.originalOrder = order;
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend(this.originalOrder, this.order);
            this.$mdDialog.hide(this.originalOrder);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

class AdminOrdersController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia"];

    orders: IOrderResource[];

    constructor(private $filter: ng.IFilterService, private $mdDialog:ng.material.IDialogService, private $mdToast: ng.material.IToastService,
                private $mdMedia:ng.material.IMedia) {

    }

    showEditOrderDialog(ev: MouseEvent, order: IOrder) {
        // var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
        this.$mdDialog.show({
            controller: EditOrderDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                order: order
            },
            template: editOrderDialogTemplate,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            // fullscreen: useFullScreen
        }).then((order) => this.saveOrder(order));
    }

    saveOrder(order: IOrder){
        order.$save().then(() => {
            this.$mdToast.showSimple(`Order saved`);
        }).catch((err) => {
            this.$mdToast.showSimple(err.message);
        });
    }
    
    getOrderTitle(order:IOrder){
        let format = "yy.M.d";
        let firstDate = this.$filter('date')(order.event_dates[0], format);
        let lastDate = this.$filter('date')(order.event_dates[order.event_dates.length - 1], format);
        return order.event_name + " " + firstDate + "-" + lastDate;
    }
}


export let AdminOrdersComponentName = 'pgAdminOrders';
export let AdminOrdersComponentOptions:ng.IComponentOptions = {
    controller: AdminOrdersController,
    template: template,
    bindings: {
        orders: "<"
    }
};