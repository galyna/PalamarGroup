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
            <md-button ng-click="$ctrl.cancel()" ng-disabled="saveCourseForm.$pristine">
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
                    <md-input-container>
                        <md-checkbox ng-model="$ctrl.course.isVisible" aria-label="Finished?">
                            Показати на сайті
                        </md-checkbox>
                    </md-input-container>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-model="$ctrl.course.name" name="name"/>
                        <!--TODO add validation-->
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="description">Опис</label>
                        <textarea ng-model="$ctrl.course.description" id="description" name="description" required></textarea>
                    </md-input-container>
                    <div>
                        <md-input-container>
                            <label for="order">Порядок відображення</label>
                            <input id="order" ng-model="$ctrl.course.order" name="order" type="number"/>
                        </md-input-container>
                        <md-input-container>
                            <label for="price">Ціна</label>
                            <input id="price" ng-model="$ctrl.course.price" name="price" type="number"/>
                        </md-input-container>
                    </div>
                    <div>
                        <md-subheader class="md-no-sticky">Дати модулів</md-subheader>
                        <div ng-repeat="date in $ctrl.course.courseModulesDates">
                            <md-datepicker ng-model="date" md-open-on-focus></md-datepicker>
                            <md-button class="md-icon-button" ng-click="$ctrl.deleteDate(date)">
                                <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                            </md-button>
                        </div>
                        <div flex-gt-xs>
                            <md-datepicker ng-model="$ctrl.newDate" 
                                           ng-change="$ctrl.addDate($ctrl.newDate)" 
                                           md-placeholder="Додати"
                                           md-open-on-focus></md-datepicker>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Автор">
            <md-card>
                <md-card-content layout-sm="row" layout-gt-sm>
                    <pg-image-input
                    flex-sm="50"
                    ng-model="$ctrl.course.author.photoUrl"
                    aspect-ratio="1"
                    crop="true"></pg-image-input>
                    <md-input-container flex>
                        <label>Ім’я автора</label>
                        <input ng-model="$ctrl.course.author.name"/>
                    </md-input-container>
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Медіа">
            <md-card>
                <md-card-content>
                    <div flex>
                        <div style="max-height:400px" layout flex ng-repeat="item in $ctrl.course.hearFormsPhotos" ng-click="null">
                            <pg-image-input
                            layout="column"
                    flex-sm="50"
                    ng-model="item.url"
                    result-image-size="{w:2000,h:800}"
                    crop="true"></pg-image-input>
                            <div layout="column">
                                <md-input-container class="md-block  ">
                                    <label for="photoName">Назва форми</label>
                                    <input id="photoName" ng-model="item.name" name="photoName"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="gord">Порядок відображення</label>
                                    <input id="gord" ng-model="item.order" type="number"/>
                                </md-input-container>
                                <md-button class="  md-raised"
                                           ng-click="$ctrl.deleteFromList($ctrl.course.hearFormsPhotos,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button ng-if="!$ctrl.showFormPhotoUpload" class="md-raised" ng-click="$ctrl.showFormPhotoUpload=true">
                            Додати форму
                        </md-button>
                        <div ng-if="$ctrl.showFormPhotoUpload">
                            <md-button ngf-select ng-model="hearFormsFile" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>
                            <div ngf-drop ng-model="hearFormsFile" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle"  result-image-size="{w:1020,h:620}" aspect-ratio="1.63"
                                          init-max-area="true"
                                          image="hearFormsFile  | ngfDataUrl"
                                          result-image="croppedHearFormsFile" ng-init="croppedHearFormsFile=''">
                                </img-crop>
                            </div>
                            <md-button class="md-primary"
                                       ng-click="$ctrl.uploadCollPhoto(croppedHearFormsFile, hearFormsFile.name,$ctrl.course.hearFormsPhotos)">
                                Завантажити
                            </md-button>
                        </div>
                    </div>                    
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Історія">
            <md-card>
                <md-card-content>
                    <div flex>
                        <md-subheader class="md-no-sticky">Форми історії попередніх модулів</md-subheader>
                        <div layout="row" ng-repeat="item in $ctrl.course.historyPhotos track by $index"
                             ng-click="null">
                            <img ng-src="{{item.url}}" class="module-history-img"/>
                            <div layout="column">
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
                    <div>
                        <md-button ng-if="!$ctrl.showHistoryPhotoUpload" class="md-raised"
                                   ng-click="$ctrl.showHistoryPhotoUpload=true">
                            Додати фото історії
                        </md-button>
                        <div ng-if="$ctrl.showHistoryPhotoUpload">
                            <md-button ngf-select ng-model="historyPhotoFile" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>
                            <div ngf-drop ng-model="historyPhotoFile" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:960,h:720}" aspect-ratio="1.33"
                                          init-max-area="true"
                                          image="historyPhotoFile  | ngfDataUrl"
                                          result-image="croppedHistoryPhotoFile" ng-init="croppedHistoryPhotoFile=''">
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
    
    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", PhotoServiceName, "CourseResource"];

    originalCourse: ICourse;
    course: ICourse;
    newDate: Date;
    showHistoryPhotoUpload:boolean;
    showFormPhotoUpload:boolean;
    showAuthorPhotoUpload:boolean;
    
    constructor(private $log: ng.ILogService, private $routeParams: ng.route.IRouteParamsService, 
                private $mdToast: ng.material.IToastService, private $timeout: ng.ITimeoutService, 
                private photoService:PhotoService,
                private CourseResource: ICourseResource){}
    
    $onInit(){
        if(this.$routeParams["id"]){
            this.CourseResource.get({id: this.$routeParams["id"]}).$promise
                .then((course) => {
                    this.originalCourse = course;
                    this.course = angular.copy(this.originalCourse);
                });
        }else{
            this.originalCourse = new this.CourseResource();
            this.course = angular.copy(this.originalCourse);
        }
    }

    cancel(){
        this.course = angular.copy(this.originalCourse);
    }

    saveCourse(form: ng.IFormController){
        if(form.$invalid) return;
        this.course.$save()
            .then((course) => {
                this.$mdToast.showSimple(`курс ${course.name} збережено`);
            })
            .catch((err)=> {
                this.$log.error(err);
                this.showErrorToast();
            });
    }

    deleteAuthorPhoto(){
        this.course.author.photoUrl = "";
    }

    //TODO: add file param type
    uploadCollPhoto(dataUrl, name, collection:IPhoto[]):void {
        // this.Upload.upload<{url: string}>({
        //     method: 'POST',
        //     url: '/api/photo',
        //     data: {
        //         file: this.Upload.dataUrltoBlob(dataUrl, name)
        //     }
        //
        // }).then((response)=> {
        //     this.$timeout(()=> {
        //         collection.push({
        //             name: "",
        //             url: response.data.url,
        //             order: 0
        //         });
        //     });
        // }).catch((err)=> {
        //     this.$log.debug("fail upload file..." + err);
        // }).finally(()=> {
        //     this.$timeout(()=> {
        //         this.showFormPhotoUpload = false;
        //         this.showHistoryPhotoUpload = false;
        //     });
        // });
    }

    //noinspection JSMethodCanBeStatic
    addDate(date:Date) {
        this.course.courseModulesDates.push(date);
        this.newDate = null;
    }
    
    deleteDate(date: Date){
        this.course.courseModulesDates.splice(this.course.courseModulesDates.indexOf(date), 1);
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice(list.indexOf(item), 1);
    }
}

export let AdminCourseComponentName = 'pgAdminCourse';
export let AdminCourseComponentUrl = '/academy/course/:id?';
export let AdminCourseComponentOptions: ng.IComponentOptions = {
    template: template,
    controller: AdminCourseController
};