import {IProductResource, IProduct, ProductResourceName} from "../../resources/product.resource";
import {IRootScope} from "../../../typings";
import {IProductOrder, ProductOrderResourceName, IProductOrderResource} from "../../resources/product.order.resource";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";
import {ICategory, IConstants} from "../../core/core.config";

const template = `


<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": {
      "@id": "http://palamar.com.ua/beauty-salon",
      "name": "Салон",
      "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg"
    }
  },{
    "@type": "ListItem",
    "position": 2,
    "item": {
      "@id": "http://palamar.com.ua/beauty-salon/products",
      "name": "Продукція"
    }
  }]
}
</script> 

<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses description-container products" layout="row"
     layout-align="center center">
    <div layout="column" layout-align="center center">

        <div class="course-bg " layout-align="center center" flex
             ng-repeat="product in $ctrl.products track by $index">
            <sb-jsonld json="{{::product.seoJson}}"></sb-jsonld>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                         ng-click="::$ctrl.showAppointmentDialog(product)">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media "
                             flex="50"><img ng-src="{{::product.photo.url}}" class="md-card-image " alt="{{::product.name}} від PALAMAR GROUP Львів " />
                        </div>
                        <div class="card-desc "
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2 ">{{::product.name}}</div>
                                    <div hide-gt-sm="true" class="md-headline">{{::product.name}}</div>

                                    <div hide show-gt-sm="true" class="md-title">Ціна {{::product.price}} грн.</div>
                                    <div hide-gt-sm="true" class="md-subhead">Ціна {{::product.price}} грн.</div>
                                    <div class="descr-container">
                                        <div 
                                            hide 
                                            show-gt-sm="true" 
                                            class="md-title md-padding"
                                            ng-bind-html="::product.description"
                                        ></div>
                                        <div 
                                            hide-gt-sm="true" 
                                            class="md-subhead"
                                            ng-bind-html="::product.description"
                                        ></div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                >
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                         ng-click="::$ctrl.showAppointmentDialog(product)">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc "
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2 ">{{::product.name}}</div>
                                    <div hide-gt-sm="true" class="md-headline">{{::product.name}}</div>

                                    <div hide show-gt-sm="true" class="md-title">Ціна {{::product.price}} грн.</div>
                                    <div hide-gt-sm="true" class="md-subhead">Ціна {{::product.price}} грн.</div>
                                    <div class="descr-container">
                                        <div 
                                            hide 
                                            show-gt-sm="true" 
                                            class="md-title md-padding"
                                            ng-bind-html="::product.description"
                                        ></div>
                                        <div 
                                            hide-gt-sm="true" 
                                            class="md-subhead"
                                            ng-bind-html="::product.description"
                                        ></div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                >
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>
                        <div class="card-media "
                             flex="50"><img ng-src="{{::product.photo.url}}" class="md-card-image " alt="{{::product.name}} від PALAMAR GROUP Львів "/>
                        </div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                         ng-click="::$ctrl.showAppointmentDialog(product)">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media "
                             flex="50"><img ng-src="{{::product.photo.url}}" class="md-card-image " alt="{{::product.name}} від PALAMAR GROUP Львів "/>
                        </div>
                        <div class="card-desc "
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2 ">{{::product.name}}</div>
                                    <div hide-gt-sm="true" class="md-headline">{{::product.name}}</div>

                                    <div hide show-gt-sm="true" class="md-title">Ціна {{::product.price}} грн.</div>
                                    <div hide-gt-sm="true" class="md-subhead">Ціна {{::product.price}} грн.</div>
                                    <div class="descr-container">
                                        <div 
                                            hide 
                                            show-gt-sm="true" 
                                            class="md-title md-padding"
                                            ng-bind-html="::product.description"
                                        ></div>
                                        <div 
                                            hide-gt-sm="true" 
                                            class="md-subhead"
                                            ng-bind-html="::product.description"
                                        ></div>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                >
                                    Замовити
                                </md-button>
                            </md-card-actions>
                        </div>
                    </md-card-content>
                </md-card>
                <div class="overlay-bg"></div>

            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="::$ctrl.showAppointmentDialog(product)">
                    <md-card-content layout="column">
                        <div class="card-media "><img ng-src="{{::product.photo.url}}" class="md-card-image" alt="{{::product.name}} від PALAMAR GROUP Львів "/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::product.name}}</div>
                                    <div class="md-title md-padding">Ціна {{::product.price}} грн.</div>
                                    <div 
                                        class="md-subhead"
                                        ng-bind-html="::product.description"
                                    ></div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                            >
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

const appointmentTemplate = `<md-dialog class="pop-form-dialog" aria-label="ЗАПИСАТИСЬ НА БЛОК" flex-sm="65" flex-xs="95" flex-gt-sm="45"
           layout="column">
    <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools md-padding ">
            <h2 class=" md-padding ">Замовити {{::vm.product.name}}</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="vm.cancel()">
                <md-icon md-svg-src="navigation:ic_cancel_24px" aria-label="Close dialog"></md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <form name="orderForm" class="md-padding pop-form" novalidate flex ng-submit="::vm.save(orderForm)">
        <md-dialog-content>
            <md-dialog-content-body>

                <md-input-container id="orderName" class="md-block">
                    <md-icon md-svg-icon="communication:ic_call_24px"></md-icon>
                    <label for="phone">Телефон</label>
                    <input id="phone" ng-model="vm.productsOrder.phone" type="text" required name="phone">
                    <div ng-messages="orderForm.phone.$error" role="alert"
                         ng-show="orderForm.$submitted && orderForm.phone.$invalid">
                        <div class="md-headline" ng-message="required">
                            Залиште хоч якусь інформацію про себе, бажано номер телефону
                        </div>
                    </div>
                </md-input-container>
                <div ng-if="vm.showDetails">

                    <md-input-container class="md-block">
                        <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
                        <label for="name">Як до вас звертатись?</label>
                        <input id="name" ng-model="vm.productsOrder.name" type="text" name="name">
                    </md-input-container>
                    <md-input-container class="md-block">
                        <md-icon md-svg-icon="communication:ic_chat_24px"></md-icon>
                        <label for="comment">Додаткова інформація</label>
                        <textarea id="comment" ng-model="vm.productsOrder.comment" name="comment"></textarea>
                    </md-input-container>

                    <div class=" md-block" layout="row" layout-align="center">
                        <div class="card-media-product md-margin" layout="column" layout-align="center center">
                            <img ng-src="{{::vm.product.photo.url}}"/>
                            <div class="card-desc md-padding" layout="column" layout-align="center center">
                                <div flex class="md-headline">{{::vm.product.name}}</div>
                                <div class="md-subhead">Ціна {{::vm.product.price}} грн.</div>
                                <div 
                                    flex 
                                    class="md-subhead" 
                                    layout="row" 
                                    layout-align="center center"
                                    ng-bind-html="::vm.product.description"
                                ></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div flex layout="row" ng-if="!vm.showDetails" class="" ng-click="vm.showDetails=true">
                    Показати більще
                    <md-button class=" md-icon-button" style="margin-top: -15px; padding: 10px">
                        <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                    </md-button>
                </div>
                <div flex layout="row" ng-if="vm.showDetails" ng-click="vm.showDetails=false">
                    Згорнути
                    <md-button class=" md-icon-button hide-form-btn" style="margin-top: -15px; padding: 10px">
                        <md-icon md-svg-icon="navigation:ic_arrow_drop_down_circle_24px"></md-icon>
                    </md-button>
                </div>
            </md-dialog-content-body>
        </md-dialog-content>
        <md-dialog-actions class="md-padding" layout="row" layout-align-xs="center center">
            <md-button type="submit" class=" xs-selected md-raised md-headline">ЗАМОВИТИ</md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`
class ProductOrderDialogController {

    static $inject = ['$mdDialog', 'productsOrder', 'product'];
    private product: IProduct
    private productsOrder: IProductOrder;
    private originalProductsOrder: IProductOrder;
    showDetails:boolean;

    constructor(private $mdDialog: ng.material.IDialogService, productsOrder: IProductOrder, product: IProduct) {
        this.product = product;
        this.productsOrder = angular.copy(productsOrder);
        this.originalProductsOrder = productsOrder;
    }

    save() {
        if (this.productsOrder.name || this.productsOrder.comment || this.productsOrder.phone) {
            angular.extend(this.originalProductsOrder, this.productsOrder);
            this.$mdDialog.hide({order: this.originalProductsOrder, product: this.product});
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class ProductsComponentController {

    static $inject = ["$log", '$rootScope', '$mdDialog', "$routeParams", 'constants', ProductOrderResourceName, ProductResourceName,
        'smoothScroll', SeoPageResourceName, "$q", '$mdMedia'];

    products: IProduct[];
    productsOrder: IProductOrder;
    showAnimation: boolean;
    markerReadySEO: string;
    seo: any;
    category: ICategory;

    constructor(private $log: ng.ILogService, private $rootScope: IRootScope,
                private $mdDialog: ng.material.IDialogService,
                private $routeParams: ng.route.IRouteParamsService,
                private constants: IConstants,
                private ProductOrderResource: IProductOrderResource,
                private ProductResource: IProductResource, private smoothScroll,
                private SeoPageResource: ISeoPageResource, private $q, private $mdMedia) {

        this.showAnimation = $rootScope.isBigSize;
        this.productsOrder = new this.ProductOrderResource();
    }


    $onInit() {
        if (this.$routeParams["category"]) {
            this.seo = this.SeoPageResource.query({query: {"name": `products/${this.$routeParams["category"]}`}}).$promise.then((seo)=> {
                if (seo.length > 0) {
                    this.$rootScope.seo = seo[0];
                    document.title = this.$rootScope.seo.title;
                }

            });

            this.category = this.constants.productCategories.filter(cat => {
                return cat.url == this.$routeParams["category"]
            })[0];

            this.products = this.ProductResource.query({
                sort: "order",
                query: {"category._id": this.category._id},
            });

            this.products.$promise.then(() => {
                    this.scrollToMain();
                    this.products.forEach((product)=> {
                        product.seoJson =
                            {
                                "@context": "http://www.schema.org",
                                "@type": "product",
                                "brand": {
                                    "@context": "http://schema.org/",
                                    "@type": "Brand",
                                    "url": "http:/palamar.com.ua/",
                                    "alternateName": "PALAMAR",
                                    "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                                    "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
                                    "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
                                    "name": "PALAMAR GROUP"
                                },
                                "name": product.name,
                                "image": "http://palamar.com.ua" + product.photo.url,
                                "description":product.description,

                                "offers": {
                                    "@type": "Offer",
                                    "priceCurrency": "UAH",
                                    "price": product.price,
                                    "seller": {
                                        "@type": "BeautySalon",
                                        "name": "PALAMAR GROUP",
                                        "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                                        "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
                                        "sameAs": [
                                            "https://www.facebook.com/hashtag/palamar_group",
                                            "https://www.instagram.com/palamar_group/",
                                            "https://vk.com/id202584528"
                                        ]
                                    }
                                }
                            };
                    })
                });
            this.$q.all([this.products.$promise, this.seo.$promise]).then((tt) => {
                this.markerReadySEO = "dynamic-content";
            });
        }
    }

    showAppointmentDialog(product) {
        this.$mdDialog.show({
            template: appointmentTemplate,
            clickOutsideToClose: true,
            bindToController: true,
            controller: ProductOrderDialogController,
            controllerAs: 'vm',
            parent: angular.element(document.body),
            fullscreen: this.$mdMedia('(max-width: 1000px)'),
            locals: {
                productsOrder: this.productsOrder,
                product: product
            },
        }).then((result) => {
            this.handleDialogResult(result);
        });
    }

    handleDialogResult(result) {
        this.$rootScope.loading = true;
        this.productsOrder = result.order;
        this.productsOrder.product = result.product._id;
        this.productsOrder.date = new Date().toJSON();
        this.productsOrder.$save()
            .then(() => {
                this.$mdDialog.hide();
                this.showOrderConfirm();
            })
            .catch((err) => {
                this.$log.error(err);
            })
            .finally(() => {
                this.productsOrder = new this.ProductOrderResource();
                this.$rootScope.loading = false;
            });

    }

    showOrderConfirm(): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Ваше замовлення прийнято. ')
                .textContent('На протязі робочого дня з вами зв`яжеться адміністратор для підтвердження замовлення. Дякуємо.')
                .ariaLabel('Ваше замовлення прийнято. ')
                .ok('Закрити')
        );

    }

    scrollToMain() {
        var options = {
            duration: 1,
            easing: 'easeInQuad',
            offset: 0,

        };
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }
}

export let ProductsComponentUrl = "/beauty-salon/products/:category";
export let ProductsComponentName = 'pgProducts';
export let ProductsComponentOptions = {
    template: template,
    controller: ProductsComponentController
};