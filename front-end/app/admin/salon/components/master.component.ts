import {IMaster, MasterResourceName, IMasterResource} from "../../../resources/master.resource";
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
import IPhoto = pg.models.IPhoto;

const template = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/salon/masters">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Майстри</md-tooltip>
            </md-button>
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" ng-disabled="saveForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button type="submit" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-tabs flex="grow" md-border-bottom>
        <md-tab label="Інфо">
            <md-card>
                <md-card-content>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-model="$ctrl.master.name" name="name"/>
                    </md-input-container>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Аватар">
            <md-card>
                <md-card-content layout-sm="row" layout-gt-sm>
                    <div layout="column">
                        <img ng-src="{{$ctrl.master.photo.url}}" class="module-history-img"/>

                        <div>
                            <md-button ng-if="!$ctrl.showPhotoUpload" class="md-raised"
                                       ng-click="$ctrl.showPhotoUpload=true">
                                Змінити фото
                            </md-button>
                            <div ng-if="$ctrl.showPhotoUpload" class="md-padding md-margin">
                                <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                    Вибрати файл
                                </md-button>
                                <md-button class="md-primary"
                                           ng-click="$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.master)">
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
        <md-tab label="Роботи">
            author works pictures
        </md-tab>
    </md-tabs>
</form>`;

export class MasterComponentController {
    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", PhotoServiceName, MasterResourceName, "Upload"];

    originalMaster:IMaster;
    master:IMaster;
    showPhotoUpload:boolean;
    showWorkUpload:boolean;

    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private photoService:PhotoService,
                private MasterResource:IMasterResource, private Upload:ng.angularFileUpload.IUploadService) {
    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.MasterResource.get({id: this.$routeParams["id"]}).$promise
                .then((master) => {
                    this.originalMaster = master;
                    this.master = angular.copy(this.originalMaster);
                });
        } else {
            this.originalMaster = new this.MasterResource();
            this.master = angular.copy(this.originalMaster);
        }
    }

    cancel() {
        this.master = angular.copy(this.originalMaster);
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.master.$save()
            .then((master) => {
                this.$mdToast.showSimple(`Дані майстра збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorToast();
            });
    }

    deletePhoto() {
        this.master.photo.url = "";
    }

    uploadPhoto(dataUrl, name, model) {
        this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name))
            .then((url)=> {
                model.photo.url = url;
            }).catch((err) => {
                this.$log.debug("fail upload file..." + err);
            }).finally(() => {
                this.$timeout(() => {
                    this.showPhotoUpload = false;
                });
            });
    };

    //TODO: add file param type
    uploadCollPhoto(dataUrl, name, collection:IPhoto[]) {
        this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name)).then((url)=> {
            collection.push({
                name: "",
                url: url,
                order: 0
            });
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        }).finally(()=> {
            this.showWorkUpload = false;
        });
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice(list.indexOf(item), 1);
    }
}

export let MasterComponentUrl = "/salon/master/:id?";
export let MasterComponentName = "pgMaster";
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};