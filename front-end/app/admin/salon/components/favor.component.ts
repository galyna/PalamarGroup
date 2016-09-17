import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {FavorResourceName, IFavorResource, IFavor} from "../../../resources/favor.resource";
import {IConstants} from "../../../core/core.config";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;


const template:string = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/salon/favors">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Послуги</md-tooltip>
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
                        <input id="name" ng-model="$ctrl.favor.name" name="name"/>
                    </md-input-container>
                    <md-input-container>
                        <label>Категорія</label>
                        <md-select ng-model="$ctrl.favor.category" ng-model-options="{trackBy: '$value._id'}">
                            <md-option ng-repeat="n in $ctrl.categories" ng-value="n">
                                {{ n.name }}
                            </md-option>
                        </md-select>
                     
                    </md-input-container>
                    <!--TODO add validation-->
                    </md-input-container>

                    <md-input-container class="md-block">
                        <label for="defPrice">Ціна</label>
                        <input type="number" ng-model="$ctrl.favor.defPrice" id="defPrice" name="defPrice"/>
                    </md-input-container>

                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Ісонка" flex>
            <md-card>
                <md-card-content layout-sm="row" layout-gt-sm>
                    <div layout="column">
                        <img ng-src="{{$ctrl.favor.photo.url}}" class="module-history-img"/>

                        <div>
                            <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                                       ng-click="$ctrl.showAuthorPhotoUpload=true">
                                Змінити фото
                            </md-button>
                            <div ng-if="$ctrl.showAuthorPhotoUpload" class="md-padding md-margin">
                                <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                    Вибрати файл
                                </md-button>
                                <md-button class="md-primary"
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.favor)">
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


export class FavorComponentController {

    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout",
        FavorResourceName, 'constants', PhotoServiceName];

    originalFavor:IFavor;
    favor:IFavor;
    showPhotoUpload:boolean;
    categories:any;


    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private favorResource:IFavorResource,
                private constants:IConstants, private photoService:PhotoService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.favorResource.get( {id: this.$routeParams["id"]} ).$promise
                .then( (favor) => {
                    this.originalFavor = favor;
                    this.favor = angular.copy( this.originalFavor );
                } );
        } else {
            this.originalFavor = new this.favorResource();
            this.favor = angular.copy( this.originalFavor );
        }
        this.categories = this.constants.favorCategories;
    }

    uploadPhoto(dataUrl, name, model) {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) )
            .then( (url)=> {
                model.photo = {
                    url: url
                }
            } ).catch( (err) => {
            this.$log.debug( "fail upload file..." + err );
        } ).finally( () => {
            this.$timeout( () => {
                this.showPhotoUpload = false;
            } );
        } );
    };

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple( text );
    }

    cancel() {
        this.favor = angular.copy( this.originalFavor );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.favor.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані послуги збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorToast();
            } );
    }


}

export let FavorComponentUrl = "/salon/favor/:id?";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};