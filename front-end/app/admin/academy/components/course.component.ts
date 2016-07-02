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
                       <div class="md-block" >
                        <md-subheader class="md-no-sticky">Дати блоків</md-subheader>                       
                        <div ng-repeat="day in $ctrl.course.days" >
                         <md-divider></md-divider>
                         <div layout="row">
                        <div class="md-margin md-padding "  id="program" name="program" >{{day.date|  date:"dd.MM.yyyy"}}</div>                          
                        <div class="md-margin md-padding "  id="program" name="program" >{{day.program}}</div>
                            <md-button class="md-icon-button" ng-click="$ctrl.deleteDate(day)">
                                <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                            </md-button>
                        </div>
                        </div>
                     </div>
                      <md-subheader class="md-no-sticky">Додати дату </md-subheader>
                       <div layout="row" class="md-block"> 
                          <md-datepicker ng-model="$ctrl.newDate"                            
                            md-placeholder="Дата"
                             md-open-on-focus></md-datepicker>
                       </div>   
                       <md-input-container layout="row" class="md-block">                                                                      
                             <label for="newProgram">Програма</label>
                             <textarea ng-model="$ctrl.newProgram" id="newProgram" name="newProgram" ></textarea>                        
                       </md-input-container>    
                       <md-input-container  class="md-block">             
                             <md-button class="md-primary"  ng-click="$ctrl.addDate()">
                               Додати
                            </md-button>
                    </md-input-container>    
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Автор">
        <md-card>
                <md-card-content layout-sm="row" layout-gt-sm>
                      <img ng-src="{{$ctrl.course.author.photoUrl}}" class="module-history-img" />
                            <div layout="column">
                                <md-input-container class="md-block  ">
                                     <label>Ім’я автора</label>
                        <input ng-model="$ctrl.course.author.name"/>
                                </md-input-container>
                                <md-input-container class="md-block  ">
                                    <label for="ord">Порядок відображення</label>
                                    <input id="ord" ng-model="item.order" type="number"/>
                                </md-input-container>
                              
                            </div>
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
                                       ng-click="$ctrl.uploadAuthorPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.course)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:500,h:500}" aspect-ratio="1"
                                          init-max-area="true"
                                          image="hearFormsPhotoFile  | ngfDataUrl"
                                          result-image="croppedhearFormsPhotoFile" ng-init="croppedhearFormsPhotoFile=''">
                                </img-crop>
                            </div>

                        </div>
                    </div> 
                </md-card-content>
            </md-card>
        </md-tab>
        <md-tab label="Медіа">
         
       <md-card>
                <md-card-content>
                    <div flex>
                        <md-subheader class="md-no-sticky">Форми блоків</md-subheader>
                        <div class="md-padding md-margin" layout="row" ng-repeat="item in $ctrl.course.hearFormsPhotos track by $index"
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
                                           ng-click="$ctrl.deleteFromList($ctrl.course.hearFormsPhotos,item)">
                                    Видалити
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button ng-if="!$ctrl.showFormPhotoUpload" class="md-raised"
                                   ng-click="$ctrl.showFormPhotoUpload=true">
                            Додати фото 
                        </md-button>
                        <div ng-if="$ctrl.showFormPhotoUpload" class="md-padding md-margin">
                            <md-button ngf-select ng-model="hearFormsPhotoFile" accept="image/*" class="md-raised">
                                Вибрати файл
                            </md-button>        
                              <md-button class="md-primary"
                                       ng-click="$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.course.hearFormsPhotos)">
                                Завантажити
                            </md-button>
                            <div ngf-drop ng-model="hearFormsPhotoFile" ngf-pattern="image/*"
                                 class="cropArea">
                                <img-crop area-type="rectangle" result-image-size="{w:500,h:550}" aspect-ratio="1"
                                          init-max-area="true"
                                          image="hearFormsPhotoFile  | ngfDataUrl"
                                          result-image="croppedhearFormsPhotoFile" ng-init="croppedhearFormsPhotoFile=''">
                                </img-crop>
                            </div>

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
                        <div class="md-padding md-margin" layout="row" ng-repeat="item in $ctrl.course.historyPhotos track by $index"
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
                        <div ng-if="$ctrl.showHistoryPhotoUpload" class="md-padding md-margin">
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

    static $inject = ["$log", "$routeParams", "$mdToast", "$timeout", PhotoServiceName, "CourseResource", "Upload"];

    originalCourse:ICourse;
    course:ICourse;
    newDate:Date;
    newProgram:string;
    showHistoryPhotoUpload:boolean;
    showFormPhotoUpload:boolean;
    showAuthorPhotoUpload:boolean;

    constructor(private $log:ng.ILogService, private $routeParams:ng.route.IRouteParamsService,
                private $mdToast:ng.material.IToastService, private $timeout:ng.ITimeoutService,
                private photoService:PhotoService,
                private CourseResource:ICourseResource, private Upload:ng.angularFileUpload.IUploadService) {
    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.CourseResource.get( {id: this.$routeParams["id"]} ).$promise
                .then( (course) => {
                    this.originalCourse = course;
                    this.course = angular.copy( this.originalCourse );
                } );
        } else {
            this.originalCourse = new this.CourseResource();
            this.course = angular.copy( this.originalCourse );
        }
    }

    cancel() {
        this.course = angular.copy( this.originalCourse );
    }

    saveCourse(form:ng.IFormController) {
        if (form.$invalid) return;
        this.course.$save()
            .then( (course) => {
                this.$mdToast.showSimple( `курс ${course.name} збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorToast();
            } );
    }

    deleteAuthorPhoto() {
        this.course.author.photoUrl = "";
    }

    uploadAuthorPhoto(dataUrl, name, model):void {
        this.Upload.upload<{url:string}>( {
            method: 'POST',
            url: '/api/photo',
            data: {
                file: this.Upload.dataUrltoBlob( dataUrl, name )
            }

        } ).then( (response)=> {
            this.$timeout( ()=> {
                model.author.photoUrl = response.data.url;
            } );
        } ).catch( function (err) {
            this.$log.debug( "fail upload file..." + err );
        } ).finally( function () {
            this.$timeout( function () {
                this.showAuthorPhotoUpload = false;
            } );
        } );
    };

    //TODO: add file param type
    uploadCollPhoto(dataUrl, name, collection:IPhoto[]):void {
        this.Upload.upload<{url:string}>( {
            method: 'POST',
            url: '/api/photo',
            data: {
                file: this.Upload.dataUrltoBlob( dataUrl, name )
            }

        } ).then( (response)=> {
            this.$timeout( ()=> {
                collection.push( {
                    name: "",
                    url: response.data.url,
                    order: 0
                } );
            } );
        } ).catch( (err)=> {
            this.$log.debug( "fail upload file..." + err );
        } ).finally( ()=> {
            this.$timeout( ()=> {
                this.showFormPhotoUpload = false;
                this.showHistoryPhotoUpload = false;
            } );
        } );
    }

    //noinspection JSMethodCanBeStatic
    addDate() {
        this.course.courseModulesDates.push( this.newDate );
        this.course.days.push( {date: this.newDate, program: this.newProgram} );
        this.newDate = null;
        this.newProgram = null;
    }

    deleteDate(day:any) {
        this.course.courseModulesDates.splice( this.course.courseModulesDates.indexOf( day.date ), 1 );
        this.course.days.splice( this.course.days.indexOf( day ), 1 );
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple( text );
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice( list.indexOf( item ), 1 );
    }
}

export let AdminCourseComponentName = 'pgAdminCourse';
export let AdminCourseComponentUrl = '/academy/course/:id?';
export let AdminCourseComponentOptions:ng.IComponentOptions = {
    template: template,
    controller: AdminCourseController
};