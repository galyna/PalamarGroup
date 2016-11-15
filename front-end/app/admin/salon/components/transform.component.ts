import {ITransform,ITransformResource,TransformResourceName} from "../../../resources/transform.resource";
import {IConstants} from "../../../core/core.config";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;


const template:string = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/salon/transforms">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Перевтілення</md-tooltip>
            </md-button>
            <h3>Перевтілення</h3>
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
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.transform.name" name="name"/>
                    </md-input-container>
                          <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input ng-disabled="::!$root.it.can('modifySalon')" id="ord" ng-model="$ctrl.transform.order" type="number"/>
                                </md-input-container>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Фото" flex>
            <md-card>
                <md-card-content>
                    <div flex>
                        <div class="md-padding md-margin" layout="row"
                             ng-repeat="item in $ctrl.transform.photos track by $index"
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
                                           ng-click="$ctrl.deleteFromList($ctrl.transform.photos ,item)">
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
                                       ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, masrerNewWork.name,$ctrl.transform.photos)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="masrerNewWork" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:400,h:400}" aspect-ratio="1"
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
                             ng-repeat="item in $ctrl.transform.videos track by $index"
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

export class TransformComponentController {


    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", '$mdDialog',
        TransformResourceName, 'constants', PhotoServiceName];

    originalTransform:ITransform;
    transform:ITransform;
    showWorkUpload:boolean;
    
    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private $mdDialog:ng.material.IDialogService, private transformResource:ITransformResource,
                private constants:IConstants, private photoService:PhotoService) {
    }


    $onInit() {
        if (this.$routeParams["id"]) {
            this.transformResource.get( {id: this.$routeParams["id"]}).$promise
                .then( (favor) => {
                    this.originalTransform = favor;
                    this.transform = angular.copy( this.originalTransform );
                } );
        } else {
            this.originalTransform = new this.transformResource();
            this.transform = angular.copy( this.originalTransform );
        }

    }


    uploadCollPhoto(dataUrl, name) {
        if (!this.transform._id) {
            this.transform.$save({populate: 'services.favor'})
                .then((master) => {

                    this.$mdToast.showSimple(`Дані майстра збережено`);
                    this.photoSave(dataUrl, name, this.transform.photos);
                })
                .catch((err)=> {
                    this.$log.error(err);
                    this.showErrorDialog();
                });

        } else {
            this.photoSave(dataUrl, name, this.transform.photos)
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



    addVideo(id) {
        if(!this.transform.videos){this.transform.videos= [];}
        this.transform.videos.push( {
            name: "",
            url: id,
            order: 0
        } );
        this.transform.$save()
            .then( (course) => {
                this.$mdToast.showSimple( `Перевтілення ${course.name} збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }


    deleteFromList(list:any[], item:any) {
        list.splice( list.indexOf( item ), 1 );
    }
 
    cancel() {
        this.transform = angular.copy( this.originalTransform );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.transform.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані перевтілення збережено` );
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

export let TransformComponentUrl ="/salon/transform/:id?";
export let TransformComponentName = 'pgTransform';
export let TransformComponentOptions = {
    template: template,
    controller: TransformComponentController
};