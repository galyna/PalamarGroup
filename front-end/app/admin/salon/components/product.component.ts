import {IProduct,ProductResourceName,IProductResource} from "../../../resources/product.resource";
import {IConstants} from "../../../core/core.config";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;


const template:string = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="admin.html#!/salon/products">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Продукція</md-tooltip>
            </md-button>
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" ng-disabled="saveForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button type="submit" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-tabs md-stretch-tabs="always" md-dynamic-height>
        <md-tab label="Інфо">
            <md-card>
                <md-card-content>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.product.name" name="name"/>
                    </md-input-container>
                     <md-input-container class="md-block">
                        <label for="order1">Порядок відображення</label>
                        <input id="order1" ng-disabled="::!$root.it.can('modifySalon')"
                               ng-model="$ctrl.product.order" name="order1" type="number"/>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="description">Опис</label>
                        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.product.description"
                                  id="description" name="description" ></textarea>
                    </md-input-container>

                    <md-input-container>
                        <label>Категорія</label>
                        <md-select ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.product.category" ng-model-options="{trackBy: '$value._id'}">
                            <md-option ng-repeat="n in $ctrl.categories" ng-value="n">
                                {{ n.name }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                    
                      <md-input-container class="md-block">
                        <label for="defPrice">Ціна</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')"
                         type="number" ng-model="$ctrl.product.price" id="defPrice" name="defPrice"/>
                    </md-input-container>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Іконка" flex>
            <md-card>
                <md-card-content >
                    <div layout="row" >
                     <div >
                        <img ng-src="{{$ctrl.product.photo.url}}" />
 </div>
                        <div ng-if="::$root.it.can('modifySalon')" >
                            <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                                       ng-click="$ctrl.showAuthorPhotoUpload=true">
                                Змінити фото
                            </md-button>
                            <div ng-if="$ctrl.showAuthorPhotoUpload" class="md-padding md-margin">
                                <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                    Вибрати файл
                                </md-button>
                                <md-button class="md-primary"
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.product)">
                                    Завантажити
                                </md-button>
                                <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                     class="cropArea">
                                    <img-crop area-type="rectangle" result-image-size="{w:500,h:500}" aspect-ratio="1"
                                              init-max-area="true"
                                              image="hearFormsPhotoFile  | ngfDataUrl"
                                              result-image="croppedhearFormsPhotoFile"
                                              ng-init="croppedhearFormsPhotoFile=''">
                                    </img-crop>
                                </div>

                            </div>
                        </div>
                </md-card-content>
            </md-card>
        </md-tab>

    </md-tabs>
</form>`;

export class ProductComponentController {



    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", '$mdDialog',
        ProductResourceName, 'constants', PhotoServiceName];

    originalProduct:IProduct;
    product:IProduct;
    showPhotoUpload:boolean;
    categories:any;


    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private $mdDialog:ng.material.IDialogService, private productResource:IProductResource,
                private constants:IConstants, private photoService:PhotoService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.productResource.get( {id: this.$routeParams["id"]}).$promise
                .then( (product) => {
                    this.originalProduct = product;
                    this.product = angular.copy( this.originalProduct );
                } );
        } else {
            this.originalProduct = new this.productResource();
            this.product = angular.copy( this.originalProduct );
        }
        this.categories = this.constants.productCategories;
    }

    uploadPhoto(dataUrl, name, model) {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) )
            .then( (url)=> {
                model.photo = {
                    url: url
                }
            } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } ).finally( () => {
            this.$timeout( () => {
                this.showPhotoUpload = false;
            } );
        } );
    };


    cancel() {
        this.product = angular.copy( this.originalProduct );
    }

    save(form:ng.IFormController) {

        this.product.$save()
            .then( (product) => {
                this.$mdToast.showSimple( `Дані послуги збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' );
        return this.$mdDialog.show( confirm );

    }

}

export let ProductComponentUrl =   "/salon/product/:id?";
export let ProductComponentName = 'pgProduct';
export let ProductComponentOptions = {
    template: template,
    controller: ProductComponentController
};