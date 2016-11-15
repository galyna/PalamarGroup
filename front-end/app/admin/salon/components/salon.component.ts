import {SalonResourceName, ISalonResource, ISalon} from "../../../resources/salon.resource";
import {IConstants} from "../../../core/core.config";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;

const template = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/salon/salons">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Салони</md-tooltip>
            </md-button>
            <span flex></span>
            <md-button ng-if="::$root.it.can('modifySalon')" ng-click="$ctrl.cancel()" ng-disabled="saveForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button ng-if="::$root.it.can('modifySalon')" type="submit" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-tabs md-stretch-tabs="always" md-dynamic-height>
        <md-tab label="Інфо">
            <md-card>
                <md-card-content>
                <md-input-container>
                        <md-checkbox ng-model="$ctrl.salon.isMain" aria-label="Finished?"
                                     ng-disabled="::!$root.it.can('modifySalon')">
                            Це головний салон
                        </md-checkbox>
                        <md-checkbox ng-model="$ctrl.salon.isAcademy" aria-label="Finished?"
                                     ng-disabled="::!$root.it.can('modifySalon')">
                            Тут знаходиться академія
                        </md-checkbox>
                    </md-input-container>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.salon.name"
                               name="name"/>
                    </md-input-container>
                    <!--<md-input-container class="md-block ">-->
                        <!--<label>Телефон</label>-->
                        <!--<input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.salon.phone" name="name"/>-->
                    <!--</md-input-container>-->
                    <!--<md-input-container class="md-block ">-->
                        <!--<label>Email</label>-->
                        <!--<input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.salon.email" name="name"/>-->
                    <!--</md-input-container>-->
                     <md-input-container class="md-block ">
                        <label>Адреса</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.salon.address" name="name"/>
                    </md-input-container>
                     <label class="md-block ">Координати карти</label>
                     <md-input-container class="md-block ">
                        <label>Довгота</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.salon.longitude" name="name"/>
                    </md-input-container>
                     <md-input-container class="md-block ">
                        <label>Широта</label>
                        <input ng-disabled="::!$root.it.can('modifySalon')" id="name" ng-model="$ctrl.salon.latitude" name="name"/>
                    </md-input-container>
                </md-card-content>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Фото" flex>
            <md-card>
                <md-card-content>
                    <div flex>
                        <div class="md-padding md-margin" layout="row"
                             ng-repeat="item in $ctrl.salon.photos track by $index"
                             ng-click="null">
                              <div>
                            <img ng-src="{{item.url}}" class="module-history-img"/>
                            </div>
                            <div layout="column" ng-if="::$root.it.can('modifySalon')">
                                <md-input-container class="md-block  ">
                                    <label for="historyNme">Назва </label>
                                    <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                </md-input-container>
                              
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.salon.photos ,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div ng-if="::$root.it.can('modifySalon')">
                        <md-button ng-if="!$ctrl.showFormPhotoUpload" class="md-raised"
                                   ng-click="$ctrl.showFormPhotoUpload=true">
                            Додати фото
                        </md-button>
                        <div ng-if="$ctrl.showFormPhotoUpload" class="md-padding md-margin">
                            <md-button ngf-select ng-model="masrerNewWork" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>
                            <md-button class="md-primary" ng-show="masrerNewWork"
                                       ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, masrerNewWork.name,$ctrl.salon.photos)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="masrerNewWork" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:600,h:600}" aspect-ratio="1"
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

    </md-tabs>
</form>`;

export class SalonComponentController {


    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", '$mdDialog',
        SalonResourceName, 'constants', PhotoServiceName];

    originalSalon:ISalon;
    salon:ISalon;
    showWorkUpload:boolean;

    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private $mdDialog:ng.material.IDialogService, private SalonResource:ISalonResource,
                private constants:IConstants, private photoService:PhotoService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.SalonResource.get( {id: this.$routeParams["id"]}).$promise
                .then( (salon) => {
                    this.originalSalon = salon;
                    this.salon = angular.copy( this.originalSalon );
                } );
        } else {
            this.originalSalon = new this.SalonResource();
            this.salon = angular.copy( this.originalSalon );
            this.salon.photos = [];
        }

    }

    uploadCollPhoto(dataUrl, name) {
        if (!this.salon._id) {
            this.salon.$save()
                .then((master) => {
                    this.$mdToast.showSimple( `Дані салону збережено` );
                    this.photoSave(dataUrl, name, this.salon.photos);
                })
                .catch((err)=> {
                    this.$log.error(err);
                    this.showErrorDialog();
                });

        } else {
            this.photoSave(dataUrl, name, this.salon.photos)
        }
    }

    photoSave(dataUrl, name, collection: IPhoto[]) {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) ).then( (url)=> {
            collection.push( {
                name: "",
                url: url,
                order: 0
            } );
        } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } ).finally( ()=> {
            this.showWorkUpload = false;
        } );
    }


    deleteFromList(list:any[], item:any) {
        list.splice( list.indexOf( item ), 1 );
    }

    cancel() {
        this.salon = angular.copy( this.originalSalon );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.salon.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані салону збережено` );
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

export let SalonComponentUrl = "/salon/salon/:id?";
export let SalonComponentName = 'pgSalon';
export let SalonComponentOptions = {
    template: template,
    controller: SalonComponentController
};