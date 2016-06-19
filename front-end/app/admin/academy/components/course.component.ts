import {ICourse} from "../../../resources/course.resource";
const template = `<form flex name="saveCourseForm" class="md-padding " novalidate ng-submit="$ctrl.saveCourse(saveCourseForm)">
    <md-content>
        <md-input-container class="md-block ">
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
        <md-input-container class="md-block ">
            <label for="order">Порядок відображення</label>
            <input id="order" ng-model="$ctrl.course.order" name="order" type="number"/>
        </md-input-container>
        <md-input-container class="md-block ">
            <label for="price">Ціна</label>
            <input id="price" ng-model="$ctrl.course.price" name="price" type="number"/>
        </md-input-container>
        <md-divider></md-divider>
        <md-divider></md-divider>
        <!--dates-->
        <div flex>
            <md-subheader class="md-no-sticky">Дати модулів</md-subheader>
            <div class="md-1-line" ng-repeat="date in $ctrl.course.courseModulesDates | date track by $index">
                {{ date| date:'dd.MM.yyyy'}}
                <md-button class="  md-raised" ng-click="$ctrl.deleteFromList($ctrl.course.courseModulesDates,date)">
                    Видалити
                </md-button>
            </div>
        </div>
        <label for="price">Додати дату</label>
        <md-datepicker ng-model="$ctrl.course.newDateModel"></md-datepicker>
        <md-button class="md-raised" ng-click="$ctrl.saveModuleDate($ctrl.course,$ctrl.course.newDateModel)">
            Зберегти
        </md-button>
        <md-divider></md-divider>
        <md-divider></md-divider>
        <!--author-->
        <md-input-container class="md-block ">
            <label for="nameauthor">Ім’я автора</label>
            <input id="nameauthor" ng-model="$ctrl.course.author.name" name="nameauthor"/>
        </md-input-container>
        <div>
            <label for="price">Фото автора</label>
            <img ng-src="{{$ctrl.course.author.photoUrl}}"/>
            <br/>
            <md-button ng-if="!$ctrl.showAuthorPhotoUpload" class="md-raised"
                       ng-click="$ctrl.showAuthorPhotoUpload=true">
                Змінити фото автора
            </md-button>
            <div ng-if="$ctrl.showAuthorPhotoUpload">
                <md-button ngf-select ng-model="authorPhotoFile" accept="image/*" class="md-raised">
                    Вибрати файл
                </md-button>
                <div ngf-drop ng-model="authorPhotoFile" ngf-pattern="image/*"
                     class="cropArea">
                    <img-crop area-type="rectangle" result-image-size="{w:300,h:300}" aspect-ratio="1"
                              init-max-area="true"
                              image="authorPhotoFile  | ngfDataUrl"
                              result-image="croppedDataUrl" ng-init="croppedDataUrl=''">
                    </img-crop>
                </div>

                <md-button class="md-primary"
                           ng-click="$ctrl.uploadAuthorPhoto(croppedDataUrl, authorPhotoFile.name,$ctrl.course)">
                    Завантажити
                </md-button>
            </div>
        </div>
        <md-divider></md-divider>
        <md-divider></md-divider>
        <!--hearForm-->
        <div flex>
            <md-subheader class="md-no-sticky">Форми модулів</md-subheader>
            <div layout="row" ng-repeat="item in $ctrl.course.hearFormsPhotos" ng-click="null">
                <img ng-src="{{item.url}}"/>
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
                    <img-crop area-type="rectangle" result-image-size="{w:403,h:604}" aspect-ratio="0.67"
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
        <md-divider></md-divider>
        <md-divider></md-divider>
        <!--history-->
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
    </md-content>
    <md-toolbar md-scroll-shrink ng-if="true">
        <div class="md-toolbar-tools">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()">Скасувати</md-button>
            <md-button type="submit" class="md-raised md-accent">Зберегти</md-button>
        </div>
    </md-toolbar>
</form>`;

interface SaveEvent {
    $event: {
        course: ICourse
    }
}

class AdminCourseController {

    course: ICourse;
    onSave:(SaveEvent) => any;
    onCancel:() => any;

    saveCourse(form: ng.IFormController) {
        if(form.$valid){
            this.onSave({
                $event: {
                    course: this.course
                }
            });
        }
    }

    cancel(){
        this.onCancel();
    }
    
    $onChange(changes){
        this.course = angular.copy(changes.course.currentValue);
    }
}

export let AdminCourseComponentName = 'pgAdminCourse';
export let AdminCourseComponentOptions: ng.IComponentOptions = {
    template: template,
    controller: AdminCourseController,
    bindings: {
        "course": "<",
        "onSave": "&",
        "onCancel": "&"
    }
};