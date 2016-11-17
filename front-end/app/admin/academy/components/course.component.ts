import {ICourse, ICourseResource} from "../../../resources/course.resource";
import IPhoto = pg.models.IPhoto;
import {PhotoServiceName, PhotoService} from "../../../resources/photo.service";
const template = `<form name="saveCourseForm" novalidate ng-submit="$ctrl.saveCourse(saveCourseForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/academy/courses">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Курси</md-tooltip>
            </md-button>
            <span flex></span>
            <md-button ng-if="::$root.it.can('modifyAcademy')" ng-click="$ctrl.cancel()"
                       ng-disabled="saveCourseForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button type="submit" ng-if="::$root.it.can('modifyAcademy')" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-tabs flex="grow" md-border-bottom>
        <md-tab label="Інфо">
            <md-card>
                <md-card-content>
                    <md-input-container>
                        <md-checkbox ng-model="$ctrl.course.isVisible" aria-label="Finished?"
                                     ng-disabled="::!$root.it.can('modifyAcademy')">
                            Показати на сайті
                        </md-checkbox>
                    </md-input-container>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-disabled="::!$root.it.can('modifyAcademy')" ng-model="$ctrl.course.name"
                               name="name"/>
                        <!--TODO add validation-->
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="description">Опис</label>
                        <textarea ng-disabled="::!$root.it.can('modifyAcademy')" ng-model="$ctrl.course.description"
                                  id="description" name="description" required></textarea>
                    </md-input-container>
                    <div>
                        <md-input-container>
                            <label for="order">Порядок відображення</label>
                            <input id="order" ng-disabled="::!$root.it.can('modifyAcademy')"
                                   ng-model="$ctrl.course.order" name="order" type="number"/>
                        </md-input-container>
                        <md-input-container>
                            <label for="price">Ціна</label>
                            <input id="price" ng-disabled="::!$root.it.can('modifyAcademy')"
                                   ng-model="$ctrl.course.price" name="price" type="number"/>
                        </md-input-container>
                    </div>
                    <div>
                        <div class="md-block">
                            <md-subheader class="md-no-sticky">Дати блоків</md-subheader>
                            <div ng-repeat="day in $ctrl.course.days">
                                <md-divider></md-divider>
                                <div layout="row">
                                    <div class="md-margin md-padding " id="prokgram" name="program">{{day.date|
                                        date:"dd.MM.yyyy"}}
                                    </div>
                                    <div class="md-margin md-padding " id="program" name="program">{{day.program}}</div>
                                    <md-button ng-if="::$root.it.can('modifyAcademy')" class="md-icon-button"
                                               ng-click="$ctrl.deleteDate(day)">
                                        <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                    </md-button>
                                </div>
                            </div>
                        </div>
                        <md-subheader ng-if="::$root.it.can('modifyAcademy')" class="md-no-sticky">Додати дату
                        </md-subheader>
                        <div layout="row" ng-if="::$root.it.can('modifyAcademy')" class="md-block">
                            <md-datepicker ng-model="$ctrl.newDate"
                                           md-placeholder="Дата"
                                           md-open-on-focus></md-datepicker>
                        </div>
                        <md-input-container ng-if="::$root.it.can('modifyAcademy')" layout="row" class="md-block">
                            <label for="newProgram">Програма</label>
                            <textarea ng-model="$ctrl.newProgram" id="newProgram" name="newProgram"></textarea>
                        </md-input-container>
                        <md-input-container ng-if="::$root.it.can('modifyAcademy')" class="md-block">
                            <md-button class="md-primary" ng-click="$ctrl.addDate()">
                                Додати
                            </md-button>
                        </md-input-container>
                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Аватар">
            <md-card>
                <md-card-content >
                    <div layout="column" >
                      <div >
                        <img ng-src="{{$ctrl.course.avatar}}" />
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
                                           ng-click="$ctrl.uploadAvatarPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.course)">
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
                <md-tab label="Автор">
                    <md-card>
                        <md-card-content layout-sm="row" >
                            <div layout="column">
                                <img ng-src="{{$ctrl.course.author.photoUrl}}" class="module-history-img"/>
                                <md-input-container class="md-block  ">
                                    <label>Ім’я автора</label>
                                    <input ng-model="$ctrl.course.author.name"
                                           ng-disabled="::!$root.it.can('modifyAcademy')"/>
                                </md-input-container>
                            </div>
                            <div ng-if="::$root.it.can('modifyAcademy')">
                                <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                                           ng-click="$ctrl.showAuthorPhotoUpload=true">
                                    Змінити фото
                                </md-button>
                                <div ng-if="$ctrl.showAuthorPhotoUpload" class="md-padding md-margin">
                                    <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*"
                                               class="md-raised">
                                        Вибрати файл
                                    </md-button>
                                    <md-button class="md-primary"
                                               ng-click="$ctrl.uploadAuthorPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.course)">
                                        Завантажити
                                    </md-button>
                                    <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                         class="cropArea">
                                        <img-crop area-type="rectangle" result-image-size="{w:500,h:500}"
                                                  aspect-ratio="1"
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
                <md-tab label="Фото">

                    <md-card>
                        <md-card-content>
                            <div flex>
                                <md-subheader class="md-no-sticky">Форми блоків</md-subheader>
                                <div class="md-padding md-margin" layout="row"
                                     ng-repeat="item in $ctrl.course.hearFormsPhotos track by $index"
                                     ng-click="null">
                                    <img ng-src="{{item.url}}" class="module-history-img"/>
                                    <div layout="column" ng-if="::$root.it.can('modifyAcademy')">
                                        <md-input-container class="md-block  ">
                                            <label for="historyNme">Назва форми</label>
                                            <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                        </md-input-container>
                                        <md-input-container class="md-block  ">
                                            <label for="ord">Порядок відображення</label>
                                            <input id="ord" ng-model="item.order" type="number"/>
                                        </md-input-container>
                                        <md-button class="  md-raised"
                                                   ng-click="$ctrl.deleteFromList($ctrl.course.hearFormsPhotos,item)">
                                            Видалити
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <div ng-if="::$root.it.can('modifyAcademy')">
                                <md-button ng-if="!$ctrl.showFormPhotoUpload" class="md-raised"
                                           ng-click="$ctrl.showFormPhotoUpload=true">
                                    Додати фото
                                </md-button>
                                <div ng-if="$ctrl.showFormPhotoUpload" class="md-padding md-margin">
                                    <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*"
                                               class="md-raised">
                                        Вибрати файл
                                    </md-button>
                                    <md-button class="md-primary"
                                               ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.course.hearFormsPhotos)">
                                        Завантажити
                                    </md-button>
                                    <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                         class="cropArea">
                                        <img-crop area-type="rectangle" result-image-size="{w:800,h:800}"
                                                  aspect-ratio="1"
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
                <md-tab label="Відео">

                    <md-card>
                        <md-card-content layout="row">
                            <div flex="60" >
                                <md-subheader class="md-no-sticky">Відео</md-subheader>
                                <div class="md-padding md-margin" class="embed-responsive-container"
                                     ng-repeat="item in $ctrl.course.videos track by $index"
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
                                                   ng-click="$ctrl.deleteFromList($ctrl.course.videos,item)">
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

                </md-tab>
                <md-tab label="Історія">
                    <md-card>
                        <md-card-content>
                            <div flex>
                                <md-subheader class="md-no-sticky">Форми історії попередніх модулів</md-subheader>
                                <div class="md-padding md-margin" layout="row"
                                     ng-repeat="item in $ctrl.course.historyPhotos track by $index"
                                     ng-click="null">
                                    <img ng-src="{{item.url}}" class="module-history-img"/>
                                    <div layout="column" ng-if="::$root.it.can('modifyAcademy')">
                                        <md-input-container class="md-block  ">
                                            <label for="historyNme">Назва форми</label>
                                            <input id="historyNme" ng-model="item.name" name="historyNme"/>
                                        </md-input-container>
                                        <md-input-container class="md-block  ">
                                            <label for="ord">Порядок відображення</label>
                                            <input id="ord" ng-model="item.order" type="number"/>
                                        </md-input-container>
                                        <md-button class="  md-raised"
                                                   ng-click="$ctrl.deleteFromList($ctrl.course.historyPhotos,item)">
                                            Видалити
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <div ng-if="::$root.it.can('modifyAcademy')">
                                <md-button ng-if="!$ctrl.showHistoryPhotoUpload" class="md-raised"
                                           ng-click="$ctrl.showHistoryPhotoUpload=true">
                                    Додати фото історії
                                </md-button>
                                <div ng-if="$ctrl.showHistoryPhotoUpload" class="md-padding md-margin">
                                    <md-button ngf-select ng-model="historyPhotoFile" accept="image/*"
                                               class="md-raised">
                                        Вибрати файл
                                    </md-button>
                                    <div ngf-drop ng-model="historyPhotoFile" ngf-pattern="image/*"
                                         class="cropArea">
                                        <img-crop area-type="rectangle" result-image-size="{w:1300,h:900}"
                                                  aspect-ratio="1.33"
                                                  init-max-area="true"
                                                  image="historyPhotoFile  | ngfDataUrl"
                                                  result-image="croppedHistoryPhotoFile"
                                                  ng-init="croppedHistoryPhotoFile=''">
                                        </img-crop>
                                    </div>
                                    <md-button class="md-primary"
                                               ng-click="$ctrl.uploadCollPhoto(croppedHistoryPhotoFile, historyPhotoFile.name,$ctrl.course.historyPhotos)">
                                        Завантажити
                                    </md-button>
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </md-tab>
    </md-tabs>
</form>`;

class AdminCourseController {

    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout",
        PhotoServiceName, "CourseResource", "$mdDialog"];

    originalCourse: ICourse;
    course: ICourse;
    newDate: Date;
    newProgram: string;
    showHistoryPhotoUpload: boolean;
    showFormPhotoUpload: boolean;
    showAuthorPhotoUpload: boolean;

    constructor(private $log: ng.ILogService, private $routeParams: ng.route.IRouteParamsService,
                private $mdToast: ng.material.IToastService, private $timeout: ng.ITimeoutService,
                private photoService: PhotoService, private CourseResource: ICourseResource,
                 private $mdDialog: ng.material.IDialogService) {
    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.CourseResource.get({id: this.$routeParams["id"]}).$promise
                .then((course) => {
                    this.originalCourse = course;
                    this.course = angular.copy(this.originalCourse);
                }).catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
        } else {
            this.originalCourse = new this.CourseResource();
            this.course = angular.copy(this.originalCourse);
        }
    }

    cancel() {
        this.course = angular.copy(this.originalCourse);
    }

    saveCourse(form: ng.IFormController) {
        if (form.$invalid) return;
        this.course.$save()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
    }

    deleteAuthorPhoto() {
        this.course.author.photoUrl = "";
    }

    addVideo(id) {
        if(!this.course.videos){this.course.videos= [];}
        this.course.videos.push({
            name: "",
            url: id,
            order: 0
        });
        this.course.$save()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorDialog();
            });
    }

    uploadAvatarPhoto(dataUrl, name, model): void {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) ).then( (url)=> {
                model.avatar = url;
        }).catch(function (err) {
            this.showErrorDialog();
            this.$log.debug("fail upload file..." + err);
        }).finally(function () {
            this.$timeout(function () {
                this.showAuthorPhotoUpload = false;
            });
        });
    };

    uploadAuthorPhoto(dataUrl, name, model): void {
        this.photoService.save( this.photoService.dataUrltoFile( dataUrl, name ) ).then( (url)=> {
                model.author.photoUrl = url;
        }).catch(function (err) {
            this.showErrorDialog();
            this.$log.debug("fail upload file..." + err);
        }).finally(function () {
            this.$timeout(function () {
                this.showAuthorPhotoUpload = false;
            });
        });
    };

    uploadCollPhoto(dataUrl, name, collection: IPhoto[]) {
        if (!this.course._id) {
            this.course.$save()
                .then((master) => {
                    this.$mdToast.showSimple( `Дані салону збережено` );
                    collection=[];
                    this.photoSave(dataUrl, name, collection);
                })
                .catch((err)=> {
                    this.$log.error(err);
                    this.showErrorDialog();
                });

        } else {
            this.photoSave(dataUrl, name, collection)
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
            this.showFormPhotoUpload = false;
            this.showHistoryPhotoUpload = false;
        } );
    }


    //noinspection JSMethodCanBeStatic
    addDate() {
        this.course.days.push({date: this.newDate, program: this.newProgram});
        this.newDate = null;
        this.newProgram = null;
    }

    deleteDate(day: any) {
        this.course.days.splice(this.course.days.indexOf(day), 1);
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list: any[], item: any) {
        list.splice(list.indexOf(item), 1);
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

export let AdminCourseComponentName = 'pgAdminCourse';
export let AdminCourseComponentUrl = '/academy/course/:id?';
export let AdminCourseComponentOptions: ng.IComponentOptions = {
    template: template,
    controller: AdminCourseController
};