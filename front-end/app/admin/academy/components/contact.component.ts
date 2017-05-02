import {ContactResourceName, IContactResource, IContact} from "../../../resources/contact.resource";
import {IConstants} from "../../../core/core.config";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;


const template:string = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div  class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/academy/contacts">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Контакти академії</md-tooltip>
            </md-button>          
    <md-subheader>Контакти академії</md-subheader>
            <span flex></span>
            <md-button ng-if="::$root.it.can('modifyAcademy')" ng-click="$ctrl.cancel()" ng-disabled="saveForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button ng-if="::$root.it.can('modifyAcademy')"  type="submit" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-tabs md-stretch-tabs="always" md-dynamic-height>
        <md-tab label="Інфо">
            <md-card>
                <md-card-content>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input ng-disabled="::!$root.it.can('modifyAcademy')" id="name" ng-model="$ctrl.contact.name" name="name"/>
                    </md-input-container>
                     <md-input-container>
                        <label>Телефон</label>
                        <input ng-disabled="::!$root.it.can('modifyAcademy')" id="name" ng-model="$ctrl.contact.phone" name="name"/>
                    </md-input-container>
                    <md-input-container>
                        <label>Email</label>
                        <input ng-disabled="::!$root.it.can('modifyAcademy')" id="name" ng-model="$ctrl.contact.email" name="name"/>
                    </md-input-container>
                     <md-input-container>
                        <label>Адреса</label>
                        <input ng-disabled="::!$root.it.can('modifyAcademy')" id="name" ng-model="$ctrl.contact.address" name="name"/>
                    </md-input-container>
                                 
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Аватарка" flex>
            <md-card>
                <md-card-content layout="row">
                   
                    <div >
                        <img ng-src="{{$ctrl.contact.photo.url}}" />
                      </div>
                        <div ng-if="::$root.it.can('modifyAcademy')">
                            <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                                       ng-click="$ctrl.showAuthorPhotoUpload=true">
                                Змінити фото
                            </md-button>
                            <div ng-if="$ctrl.showAuthorPhotoUpload" class="md-padding md-margin">
                                <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                    Вибрати файл
                                </md-button>
                                <md-button class="md-primary"
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.contact)">
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
                       
                </md-card-content>
            </md-card>
        </md-tab>

    </md-tabs>
</form>`;


export class ContactComponentController {

    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout",
        ContactResourceName, 'constants', PhotoServiceName, "$mdDialog"];

    originalContact:IContact;
    contact:IContact;
    showPhotoUpload:boolean;


    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private contactResource:IContactResource,
                private constants:IConstants, private photoService:PhotoService,
                private $mdDialog:ng.material.IDialogService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.contactResource.get( {id: this.$routeParams["id"]} ).$promise
                .then( (favor) => {
                    this.originalContact = favor;
                    this.contact = angular.copy( this.originalContact );
                } ).catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
        } else {
            this.originalContact = new this.contactResource();
            this.contact = angular.copy( this.originalContact );
        }

    }

    uploadPhoto(dataUrl, name) {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) )
            .then( (url)=> {
                this.contact.photo = {
                    name: "",
                    url: url,
                    order: 0
                }
            } ).catch( (err) => {
                this.showErrorDialog();
            this.$log.debug( "fail upload file..." + err );
        } ).finally( () => {
            this.$timeout( () => {
                this.showPhotoUpload = false;
            } );
        } );
    };


    cancel() {
        this.contact = angular.copy( this.originalContact );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.contact.isAcademy = true;
        this.contact.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані контакту збережено` );
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

export let ContactComponentUrl = "/academy/contact/:id?";
export let ContactComponentName = 'pgContact';
export let ContactComponentOptions = {
    template: template,
    controller: ContactComponentController
};
