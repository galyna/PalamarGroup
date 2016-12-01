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
                        <md-input-container class="md-block">
                        <label for="order1">Порядок відображення</label>
                        <input id="order1" ng-disabled="::!$root.it.can('modifySalon')"
                               ng-model="$ctrl.favor.order" name="order1" type="number"/>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="description">Опис</label>
                        <textarea ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.favor.description"
                                  id="description" name="description" ></textarea>
                    </md-input-container>
                      
                    <md-input-container>
                        <label>Категорія</label>
                        <md-select ng-model="$ctrl.favor.category" ng-model-options="{trackBy: '$value._id'}">
                            <md-option ng-repeat="n in $ctrl.categories" ng-value="n">
                                {{ n.name }}
                            </md-option>
                        </md-select>
                     
                    </md-input-container>
                  
                  
                    <md-input-container class="md-block">
                        <label for="defPrice">Ціна</label>
                        <input type="number" ng-model="$ctrl.favor.defPrice" id="defPrice" name="defPrice"/>
                    </md-input-container>

                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Іконка" flex>
            <md-card>
                <md-card-content >
                    <div layout="column" >
                    <div >
                        <img ng-src="{{$ctrl.favor.photo.url}}" />
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
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.favor)">
                                    Завантажити
                                </md-button>
                                <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                     class="cropArea">
                                    <img-crop area-type="rectangle" result-image-size="{w:500,h:560}" aspect-ratio="0.95"
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
 <md-tab label="Фото" flex>
            <md-card>
                <md-card-content>
                    <div flex>
                        <div class="md-padding md-margin" layout="row"
                             ng-repeat="item in $ctrl.favor.photos track by $index"
                             ng-click="null">
                            <img ng-src="{{item.url}}" class="module-history-img"/>
                            <div layout="column" ng-if="::$root.it.can('modifySalon')">
                                <md-input-container class="md-block  ">
                                    <label for="historyNme">Назва </label>
                                    <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input id="ord" ng-model="item.order" type="number"/>
                                </md-input-container>
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.favor.photos ,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div ng-if="::$root.it.can('modifySalon')">
                        <md-button  class="md-raised"
                                   ng-click="$ctrl.showFormPhotoUpload=true">
                            Додати фото
                        </md-button>
                        <div ng-if="$ctrl.showFormPhotoUpload" class="md-padding md-margin">
                            <md-button ngf-select ng-model="masrerNewWork" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>
                            <md-button class="md-primary" ng-show="masrerNewWork"
                                       ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, masrerNewWork.name)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="masrerNewWork" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:500,h:500}" aspect-ratio="1"
                                          init-max-area="true"
                                          image="masrerNewWork  | ngfDataUrl"
                                          result-image="croppedhearFormsPhotoFile"
                                          ng-init="croppedhearFormsPhotoFile=''">
                                </img-crop>
                            </div>

                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Відео" flex>
            <md-card>
                <md-card-content layout="row">
                    <div flex="60">
                        <md-subheader class="md-no-sticky">Відео</md-subheader>
                        <div class="md-padding md-margin"
                             ng-repeat="item in $ctrl.favor.videos track by $index"
                             ng-click="null">
                            <div class="embed-responsive embed-responsive-16by9">
                                <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                               video-id="item.url"></youtube-video>
                            </div>
                            <div layout="column" ng-if="::$root.it.can('modifySalon')">
                                <md-input-container class="md-block  ">
                                    <label for="historyNme">Назва відео</label>
                                    <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                </md-input-container>
                                 <md-input-container class="md-block  ">
                                    <label for="historyNme">ID</label>
                                    <input id="historyNme" ng-model="item.url" name="historyNme"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input id="ord" ng-model="item.order" type="number"/>
                                </md-input-container>
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.transform.videos,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div flex ng-if="::$root.it.can('modifySalon')">
                        <md-input-container class="md-block  ">
                            <label for="videoId">ID</label>
                            <input id="videoId" ng-model="videoId" name="videoId"/>
                        </md-input-container>
                        <md-button class="md-raised" ng-if="::$root.it.can('modifySalon')"
                                   ng-click="$ctrl.addVideo(videoId)">
                            Додати відео
                        </md-button>

                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
    </md-tabs>
</form>`;


export class FavorComponentController {

    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", '$mdDialog',
        FavorResourceName, 'constants', PhotoServiceName];

    originalFavor:IFavor;
    favor:IFavor;
    showPhotoUpload:boolean;
    categories:any;
    showAuthorPhotoUpload:boolean
    showWorkUpload:boolean;

    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private $mdDialog:ng.material.IDialogService, private favorResource:IFavorResource,
                private constants:IConstants, private photoService:PhotoService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.favorResource.get( {id: this.$routeParams["id"]}).$promise
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
        this.favor = angular.copy( this.originalFavor );
    }

    save(form:ng.IFormController) {

        this.favor.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані favor збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }

    uploadCollPhoto(dataUrl, name) {
        if (!this.favor._id) {
            this.favor.$save({populate: 'services.favor'})
                .then((master) => {

                    this.$mdToast.showSimple(`Дані майстра збережено`);
                    this.photoSave(dataUrl, name, this.favor.photos);
                })
                .catch((err)=> {
                    this.$log.error(err);
                    this.showErrorDialog();
                });

        } else {
            this.photoSave(dataUrl, name, this.favor.photos)
        }
    }

    photoSave(dataUrl, name, collection: IPhoto[]) {
        this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name)).then((url)=> {
            collection.push({
                name: "",
                url: url,
                order: 0
            });
        }).catch((err)=> {
            this.$log.error(err);
            this.showErrorDialog();
        }).finally(()=> {
            this.showWorkUpload = false;
        });
    }

    deleteFromList(list:any[], item:any) {
        list.splice( list.indexOf( item ), 1 );
    }

    addVideo(id) {
        if(!this.favor.videos){this.favor.videos= [];}
        this.favor.videos.push( {
            name: "",
            url: id,
            order: 0
        } );
        this.favor.$save()
            .then( (course) => {
                this.$mdToast.showSimple( `Дані favor збережено` );
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
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }

}

export let FavorComponentUrl = "/salon/favor/:id?";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};