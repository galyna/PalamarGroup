
import {IProductResource, IProduct, ProductResourceName} from "../../resources/product.resource";
import {IRootScope} from "../../../typings";
import {IProductOrder, ProductOrderResourceName, IProductOrderResource} from "../../resources/product.order.resource";

const template = `<div class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div class="course-bg " layout-align="center center" flex
             ng-repeat="product in $ctrl.products track by $index">
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::product.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-md="true" class="md-display-2">{{::product.name}}</div>
                                    <div hide-md="true" class="md-display-1">{{::product.name}}</div>
                                    <div class="descr-container">
                                        <div class="md-title">{{::product.description}}</div>

                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(product)">
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>
                    </md-card-content>
                </md-card>
                <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc  " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                              flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                  <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2">{{::product.name}}</div>
                                    <div  hide-gt-sm="true" class="md-display-1">{{::product.name}}</div>
                                    <div  class="descr-container">
                                        <div hide show-gt-sm="true" class="md-title">{{::product.description}}</div>
                                        <div  hide-gt-sm="true" class="md-subhead">{{::product.description}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(product)">
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>
                        <div class="card-media " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::product.photo.url}}" class="md-card-image"/></div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50"><img src="{{::product.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " flex="50"
                             data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2">{{::product.name}}</div>
                                    <div  hide-gt-sm="true" class="md-display-1">{{::product.name}}</div>
                                    <div  class="descr-container">
                                        <div hide show-gt-sm="true" class="md-title">{{::product.description}}</div>
                                        <div  hide-gt-sm="true" class="md-subhead">{{::product.description}}</div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(product)">
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>

                    </md-card-content>
                </md-card>
                <div class="overlay-bg"></div>
                <!--<md-button hide show-gt-xs="true" class=" md-fab  side-up-btn"-->

                <!--data-aos-anchor="#trigger-right"-->
                <!--data-aos-anchor-placement="top-center" data-aos-delay="100" scroll-to="mainContent"-->
                <!--easing="easeInOutCubic"-->
                <!--duration="1800" aria-label="up">-->
                <!--<md-icon class=""-->
                <!--md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>-->
                <!--</md-button>-->
            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::product.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::product.name}}</div>
                                    <div class="md-title">{{::product.description}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                       ng-click="$ctrl.showAppointmentDialog(product)">
                                Замовити
                            </md-button>
                        </div>
                    </md-card-content>

                </md-card>

            </div>
        </div>
    </div>
</div>


`;

const appointmentTemplate = `<md-dialog class="pop-form-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="85" flex-xs="95" flex-gt-sm="65"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 class=" md-padding ">Замовити</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex>
        <md-dialog-content>
            <md-dialog-content-body >
               <div class=" md-block" layout="row" layout-align="center">
                                    <div class="card-media-product  layout="column" >
                                        <img src="{{::vm.product.photo.url}}" />
                                        <div class="card-desc " flex="100" layout="column" layout-align="center center">                                          
                                                    <div flex class="md-title">{{::vm.product.name}}</div>
                                                      <div flex class="md-headline">{{::vm.product.description}}</div>                                                                                    
                                        </div>
                                    </div>
        </div>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                    <label for="name">Як до вас звертатися</label>
                    <input id="name" ng-model="vm.productsOrder.name" type="text" name="name">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_email_24px"></md-icon>
                    <label for="email">email</label>
                    <input id="email" ng-model="vm.productsOrder.email" type="text" name="email">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                    <label for="phone">Телефон</label>
                    <input id="phone" ng-model="vm.productsOrder.phone" type="text" name="phone">
                </md-input-container>
                <md-input-container class="md-block">
                    <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                    <label for="comment">Додаткова інформація</label>
                    <textarea id="comment" ng-model="vm.productsOrder.comment" name="comment"></textarea>
                </md-input-container>
                <p class=" md-headline">Після замовлення з Вами зв'яжеться адміністратор для узгодження деталей</p>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            <md-button ng-click="vm.save(orderForm)" class=" xs-selected md-raised md-headline">ЗАМОВИТИ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`
class ProductOrderDialogController {

    static $inject = ['$mdDialog', 'productsOrder','product'];
    private product:IProduct
    private productsOrder:IProductOrder;
    private originalProductsOrder:IProductOrder;

    constructor(private $mdDialog:ng.material.IDialogService, productsOrder:IProductOrder,product:IProduct) {
        this.product=product;
        this.productsOrder = angular.copy( productsOrder );
        this.originalProductsOrder = productsOrder;
    }

    save(orderForm) {

        angular.extend( this.originalProductsOrder, this.productsOrder );
        this.$mdDialog.hide( {order:this.originalProductsOrder,product:this.product} );
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class ProductsComponentController {

    static $inject = ["$log", '$rootScope','$mdDialog',ProductOrderResourceName, ProductResourceName ];

    products:IProduct[];
    productsOrder:IProductOrder;
    showAnimation:boolean;


    constructor(private $log:ng.ILogService, private $rootScope:IRootScope,private $mdDialog:ng.material.IDialogService,
                private ProductOrderResource:IProductOrderResource, private ProductResource:IProductResource) {

        this.showAnimation = $rootScope.isBigSize;
        this.productsOrder=new this.ProductOrderResource();
    }
    
  
    

    $onInit() {
        this.products = this.ProductResource.query();
        this.products.$promise.then( (products) => {
                this.products= products;
            }
        );
    }

    showAppointmentDialog(product) {
        this.$mdDialog.show( {
            template: appointmentTemplate,
            clickOutsideToClose: true,
            bindToController: true,
            controller: ProductOrderDialogController,
            controllerAs: 'vm',
            parent: angular.element( document.body ),
            locals: {
                productsOrder: this.productsOrder,
                product:product
            },
        } ).then( (result) => {
            this.handleDialogResult( result );
        } );
        ;
    }

    handleDialogResult(result) {
        this.$rootScope.loading = true;
        this.productsOrder=result.order;
        this.productsOrder.product=result.product._id;
        this.productsOrder.date = new Date().toJSON();
        this.productsOrder.$save()
            .then( () => {
                this.$mdDialog.hide();
                this.showOrderConfirm();
            } )
            .catch( (err) => {
                this.$log.error( err );
            } )
            .finally( () => {
                this.productsOrder = new this.ProductOrderResource();
                this.$rootScope.loading = false;
            } );

    }

    showOrderConfirm():void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Ваше замовлення прийнято. ' )
                .textContent( 'На протязі дня з вами зв`яжеться адміністратор. Дякуємо.' )
                .ariaLabel( 'Ваше замовлення прийнято. ' )
                .ok( 'Закрити' )
        );

    }
}

export let ProductsComponentUrl = "/products";
export let ProductsComponentName = 'pgProducts';
export let ProductsComponentOptions = {
    template: template,
    controller:ProductsComponentController
};