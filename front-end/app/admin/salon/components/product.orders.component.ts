import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {
    ProductOrderResourceName,
    IProductOrder,
    IProductOrderResource
} from "../../../resources/product.order.resource";
import {IConstants} from "../../../core/core.config";

let template = `<md-toolbar>
<div class="md-toolbar-tools">
    <h1>Замовлення продукції</h1>
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
  
    <md-list-item  class="md-2-line" ng-repeat="order in $ctrl.orders"   ng-class="{answered:order.status==3, approved:order.status==1, bay:order.status==2}" ng-click=" $ctrl.showEditOrderDialog($event, order)">
            <div class="md-list-item-text" style='min-width: 130px;' layout="column">
            <h3>Статус</h3>
            <p ng-if="order.status==0">Новий</p>
            <p class="approved-titlt" ng-if="order.status==1">Підтвірджено</p>
            <p ng-if="order.status==2">Оплачено</p>
            <p ng-if="order.status==3">Відмова</p>
        </div>

        <img ng-src="{{order.product.photo.url}}" class="md-avatar" alt="{{master.order}}" />
        <div class="md-list-item-text" layout="column">
          
            <p>{{::$ctrl.getOrderTitle(order)}}</p>
        </div>
         <div class="md-list-item-text" layout="column">
            <h3>Створено</h3>
             <p>{{order.date|date:'dd.MM.yyyy'}}</p>
        </div>
         <div class="md-list-item-text" layout="column">
            <h3>Ціна</h3>
            <p>{{order.product.price}} грн.</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Замовник</h3>
            <p>{{::order.name||'Анонім'}} {{::order.phone||order.email||''}}</p>
        </div>

       
        <md-icon class="md-secondary "  ng-click="$ctrl.showEditOrderDialog($event, order)" md-svg-icon="communication:ic_message_24px"> 
         <md-tooltip > Деталі</md-tooltip></md-icon>
          
         <md-icon class="md-secondary " ng-if="::$root.it.can('modifySalon')" ng-click=" ::$root.it.can('modifySalon') && $ctrl.showDeleteDialog($event, order)" 
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip ng-if="::$root.it.can('modifySalon')">Видалити</md-tooltip>  
            </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>

`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
             <img  ng-src="{{$ctrl.order.product.photo.url}}" class="avatar" alt="$ctrl.order.product.photo.url" />
            <h2>{{$ctrl.order.product.name}}</h2>
      
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
            
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">
                <md-subheader flex="1">
                 <label>Заовлення створено {{$ctrl.order.date|date:'dd.MM.yyyy'}}</label>

                     <md-input-container class="md-block">
                    <label>Замовник</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.order.name" >
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Телфон</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.order.phone" >
                </md-input-container>
                   
            
                </md-input-container>
                    <md-input-container class="md-block">
                    <label>Коментар замовника</label>
                    <input ng-disabled="::!$root.it.can('modifySalon')" type="text" ng-model="$ctrl.order.comment" >
                </md-input-container>
                  
                </md-subheader>
                <div flex="2" layout="column" class="md-margin">
                    <md-input-container>
                        <label>Статас</label>
                        <md-select ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.order.status"
                                   >
                            <md-option ng-repeat="status in $ctrl.orderStatuses" ng-value="status._id">                          
                                    <span>  {{ status.name }}  </span>
                            </md-option>
                        </md-select>
                    </md-input-container>                   
                    <md-input-container>
                        <label>Коментар адміністратора</label>
                        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.order.admin_comment"></textarea>
                    </md-input-container>
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifySalon')">
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

    private order:IProductOrder;
    private originalOrder:IProductOrder;
    private orderStatuses:any;

    constructor(private $mdDialog:ng.material.IDialogService, private constants:IConstants, order:IProductOrder) {
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

export class ProductOrdersComponentController {


    static $inject = ["$mdDialog", "$mdToast", ProductOrderResourceName, PagingServiceName];

    orders:IProductOrder[];
    paging:any;
    private order:IProductOrder;
    private start:Date;
    private end:Date;

    constructor(private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private orderResource:IProductOrderResource, private pagingService:PagingService) {
        this.setDefaultDates();
    }

    setDefaultDates() {
        this.end= new Date();
        this.start= new Date();
        this.start.setMonth(this.start.getMonth() - 1);
        this.start.setHours(0,0,0)
    }

    Search() {
        this.showPage();
    }

    $onInit() {
        this.showPage();
    }

    showEditOrderDialog(ev:MouseEvent, order:IProductOrder) {

        this.$mdDialog.show( {
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                order: order,

            },
            parent: angular.element( document.body ),
            targetEvent: ev,
        } ).then( (order) => this.saveOrder( order ) );
    }


    saveOrder(order:IProductOrder) {

        order.$save().then( () => {
            this.$mdToast.showSimple( `Замовлення збережено` );
        } ).catch( (err)=> {
            this.showErrorDialog();
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    

    showDeleteDialog(ev, order:IProductOrder) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Замовлення ${order.name || ''}?` )
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

    deleteOrder(order:IProductOrder) {

        order.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    getOrderTitle(order:any) {

        if (order.product) {
            return order.product.name;
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

    private showPage(page = 1) {
        this.orders = this.orderResource.query(
            {
                page: page,
                sort: {"status": 1, "date": -1},
                query:{'date': {"$lte":this.end.toJSON(),"$gte":this.start.toJSON()}},
                populate: 'product'
            },
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }
}

export let ProductOrdersComponentUrl = '/salon/productorders';
export let ProductOrdersComponentName = 'pgProductOrders';
export let ProductOrdersComponentOptions = {
    template: template,
    controller: ProductOrdersComponentController
};