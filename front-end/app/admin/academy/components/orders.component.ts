import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IConstants} from "../../../core/core.config";
let template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h1>Записи на навчальний курс</h1>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>
<div flex="100" layout="row" layout-xs="column" class="md-padding">
    <div  class=" md-margin"  layout="row">
        <label>Від</label>
        <md-datepicker  placeholder="Дата" flex ng-model="$ctrl.start"></md-datepicker>
    </div>
    <div class=" md-margin"  layout="row">
        <label>До</label>
        <md-datepicker  placeholder="Дата" flex ng-model="$ctrl.end"></md-datepicker>
    </div>   
        <md-button class="md-raised md-margin" ng-click="$ctrl.Search()">Пошук</md-button>
    
</div>
<md-list flex class="orders-list">

    <md-list-item class="md-2-line" ng-repeat="order in $ctrl.orders"
                  ng-class="{answered:order.status==3, approved:order.status==1, bay:order.status==2}"
                  ng-click=" $ctrl.showEditOrderDialog($event, order)">

        <div class="md-list-item-text" style='min-width: 130px;' layout="column">
            <h3>Статус</h3>
            <p ng-if="order.status==0">Новий</p>
            <p class="approved-titlt" ng-if="order.status==1">Підтвірджено</p>
            <p ng-if="order.status==2">Оплачено</p>
            <p ng-if="order.status==3">Відмова</p>
        </div>


        <div class="md-list-item-text" layout="column">
            <h3>Запис створено</h3>
            <p>{{order.date|date:'dd.MM.yyyy'}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Курс</h3>
            <p>{{::$ctrl.getOrderTitle(order)}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Замовник</h3>
            <p>{{::order.name||'Анонім'}} {{::order.phone||order.email||''}}</p>
        </div>

        <md-icon class="md-secondary " ng-click="$ctrl.showEditOrderDialog($event, order)"
                 md-svg-icon="communication:ic_message_24px">
            <md-tooltip> Деталі</md-tooltip>
        </md-icon>

        <md-icon class="md-secondary " ng-if="::$root.it.can('modifyAcademy')"
                 ng-click=" ::$root.it.can('modifyAcademy') && $ctrl.showDeleteDialog($event, order)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>

`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2 ng-if="$ctrl.order.event_name">{{$ctrl.order.event_name}}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
            
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">
                <md-subheader flex="1">
                    <p ng-if="$ctrl.order.date">Запис створено {{$ctrl.order.date|date:'dd.MM.yyyy'}}</p>
                     <md-input-container class="md-block">
                    <label>Замовник</label>
                    <input ng-disabled="::!$root.it.can('modifyAcademy')" type="text" ng-model="$ctrl.order.name" >
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Телфон</label>
                    <input ng-disabled="::!$root.it.can('modifyAcademy')" type="text" ng-model="$ctrl.order.phone" >
                </md-input-container>
                   
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Email</label>
                    <input ng-disabled="::!$root.it.can('modifyAcademy')" type="text" ng-model="$ctrl.order.email" >
                </md-input-container>
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Коментар замовника</label>
                    <input ng-disabled="::!$root.it.can('modifyAcademy')" type="text" ng-model="$ctrl.order.comment" >
                </md-input-container>
                  
                </md-subheader>
                <div flex="2" layout="column" class="md-margin">
                  <md-input-container>
                        <label>Статас</label>
                        <md-select ng-disabled="::!$root.it.can('modifyAcademy')" ng-model="$ctrl.order.status"
                                   >
                            <md-option ng-repeat="status in $ctrl.orderStatuses" ng-value="status._id">                          
                                    <span>  {{ status.name }}  </span>
                            </md-option>
                        </md-select>
                    </md-input-container>
                
                    <md-input-container>
                        <label>Коментар адміністратора</label>
                        <textarea ng-disabled="::!$root.it.can('modifyAcademy')" ng-model="$ctrl.order.admin_comment"></textarea>
                    </md-input-container>
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifyAcademy')">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;
class EditDialogController {

    static $inject = ['$mdDialog', 'constants', 'order'];

    private order:IOrder;
    private originalOrder:IOrder;
    private orderStatuses:any;
   
    constructor(private $mdDialog:ng.material.IDialogService, private constants:IConstants, order:IOrder) {
        this.order = angular.copy( order );
        this.originalOrder = order;
        this.orderStatuses = constants.orderStatuses;

       
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend( this.originalOrder, this.order );
            this.$mdDialog.hide( this.originalOrder );
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
export class AdminOrdersController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia", OrderResourceName, PagingServiceName,];

    orders:IOrder[];
    paging:any;
    private order:IOrder;
    private start:Date;
    private end:Date;



    constructor(private $filter:ng.IFilterService, private $mdDialog:ng.material.IDialogService,
                private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private orderResource:IOrderResource,
                private pagingService:PagingService) {
       
        this.setDefaultDates();
       

    }
    setDefaultDates() {
        this.end= new Date();
        this.start= new Date();
        this.start.setMonth(this.start.getMonth() - 1);
        this.start.setHours(0,0,0)
    }

    private showPage(page = 1) {
        this.orders = this.orderResource.query( {page: page, sort: {"status": 1,  "date": -1}, query:{'date': {"$lte":this.end.toJSON(),"$gte":this.start.toJSON()}}},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    } 
    
    Search() {
        this.showPage();
    }
    $onInit() {
        this.showPage();
    }

    showEditOrderDialog(ev:MouseEvent, order:IOrder) {

        this.$mdDialog.show( {
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                order: order
            },
            parent: angular.element( document.body ),
            targetEvent: ev,
        } ).then( (order) => this.saveOrder( order ) );
    }


    saveOrder(order:IOrder) {

        order.$save().then( () => {
            this.$mdToast.showSimple( `Запис збережено` );
        } ).catch( (err)=> {
            this.showErrorDialog();
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

   
    showDeleteDialog(ev, order:IOrder) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Запис ${order.name || ''}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteOrder( order );
            } );
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }

    deleteOrder(order:IOrder) {

        order.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    getOrderTitle(order:IOrder) {
        let format = "dd.MM.yyyy";
        if (order.event_dates.length > 0) {
            let firstDate = this.$filter( 'date' )( order.event_dates[0], format );
            let lastDate = this.$filter( 'date' )( order.event_dates[order.event_dates.length - 1], format );
            return order.event_name + " " + firstDate + "-" + lastDate;
        } else {
            return "";
        }
    }

    prev() {
        this.showPage( this.pagingService.prevPage() );
    }

    next() {
        this.showPage( this.pagingService.nextPage() );
    }

  
}

export let AdminOrdersComponentUrl = '/academy/orders';
export let AdminOrdersComponentName = 'pgAdminOrders';
export let AdminOrdersComponentOptions:ng.IComponentOptions = {
    controller: AdminOrdersController,
    template: template
};