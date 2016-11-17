
import {
    IAcademyVideosResource, AcademyVideosResourceName,
    IAcademyVideos
} from "../../../resources/academy.video.resource";
const template:string = `<form name="saveForm" novalidate ng-submit="$ctrl.save(saveForm)" flex layout="column">
    <md-toolbar>
        <div  class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/academy/videos">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Вілео група</md-tooltip>
            </md-button>          
    <md-subheader>Вілео група академії</md-subheader>
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
                        <label for="name">Назва Групи</label>
                        <input ng-disabled="::!$root.it.can('modifyAcademy')" id="name" ng-model="$ctrl.contact.name" name="name"/>
                    </md-input-container>
                  <md-input-container>
                            <label for="order">Порядок відображення</label>
                            <input id="order" ng-disabled="::!$root.it.can('modifyAcademy')"
                                   ng-model="$ctrl.contact.order" name="order" type="number"/>
                        </md-input-container>
                                 
                </md-card-content>
            </md-card>
        </md-tab>
              <md-tab label="Відео">

                    <md-card>
                        <md-card-content layout="row">
                            <div flex="60">
                                <md-subheader class="md-no-sticky">Відео</md-subheader>
                                <div class="md-padding md-margin"
                                     ng-repeat="item in $ctrl.contact.videos track by $index"
                                     ng-click="null">
                                    <div class="embed-responsive embed-responsive-16by9">
                                        <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                                       video-id="item.url"></youtube-video>
                                    </div>
                                    <div layout="column" ng-if="::$root.it.can('modifyAcademy')">
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
                                                   ng-click="$ctrl.deleteFromList($ctrl.contact.videos,item)">
                                            Видалити
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <div flex ng-if="::$root.it.can('modifyAcademy')">
                                <md-input-container class="md-block  ">
                                    <label for="videoId">ID</label>
                                    <input id="videoId" ng-model="videoId" name="videoId"/>
                                </md-input-container>
                                <md-button class="md-raised" ng-if="::$root.it.can('modifyAcademy')"
                                           ng-click="$ctrl.addVideo(videoId)">
                                    Додати відео
                                </md-button>

                            </div>
                        </md-card-content>
                    </md-card>

                </

    </md-tabs>
</form>`;

export class VideoComponentController {

    static $inject = ["$log", "$routeParams", "$mdToast",
        AcademyVideosResourceName,  "$mdDialog"];

    originalContact:IAcademyVideos;
    contact:IAcademyVideos;
    showPhotoUpload:boolean;


    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService,
                private contactResource:IAcademyVideosResource,
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


    cancel() {
        this.contact = angular.copy( this.originalContact );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;

        this.contact.$save()
            .then( (favor) => {
                this.$mdToast.showSimple( `Дані відео групи збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } );
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list: any[], item: any) {
        list.splice(list.indexOf(item), 1);
    }

    addVideo(id) {
        if(!this.contact.videos){this.contact.videos= [];}
        this.contact.videos.push({
            name: "",
            url: id,
            order: 0
        });
        this.contact.$save()
            .then((course) => {
                this.$mdToast.showSimple(`video збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }



}

export let VideoComponentUrl = "/academy/video/:id?";
export let VideoComponentName = 'pgVideo';
export let VideoComponentOptions = {
    template: template,
    controller: VideoComponentController
};