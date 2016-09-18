import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";


const template = `<div class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПОСЛУГИ</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">
        <div flex flex-gt-md="60" flex-md="80">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="category in $ctrl.categories"
                         class="md-margin " flex-gt-md="22" flex-md="22" flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showFavors(category._id)">
                    <card-image-container>
                        <img ng-src="{{'/content/images/services/'+category._id+'.jpg'}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{category.name}}</span>
                    </md-card-content>
                </md-card>
                
            </div>
        </div>
    </div>
    <div layout="row" flex>
        <div class="page-delimiter content-block" id="trigger-right" flex>
            <div class="fit-screen-wrap header-long " layout="column">
                <div flex="none" layout="row" class="md-padding program-block  " layout-align=" center center">
                    <div ng-repeat="day in :: $ctrl.days track by $index">
                        <div class="date-block md-margin " data-aos="fade-up" layout="column"
                             layout-align=" center center">
                            <div class=" md-headline">{{ day.name}}</div>
                            <div class="md-subhead  ">{{day.program}}</div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="overlay-days">

            </div>
            <md-button hide show-gt-xs="true" class=" md-fab  side-up-btn"
                       data-aos="fade-left" data-aos-easing="ease-in-out-back"
                       data-aos-anchor="#trigger-right"
                       data-aos-anchor-placement="top-center" data-aos-delay="100" scroll-to="mainContent"
                       easing="easeInOutCubic"
                       duration="1800" aria-label="up">
                <md-icon class=""
                         md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>
            </md-button>
        </div>
    </div>
    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> МАЙСТРИ</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-md="80">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="master in $ctrl.masters"
                         class="md-margin " flex-gt-md="22" flex-md="22" flex-gt-xs="46" flex-xs="80"
                         ng-click="::vm.showMediaObserver(vm.course.hearFormsPhotos, $index)">
                    <card-image-container>
                        <img ng-src="{{::master.photo.url}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::master.name}}</span>
                    </md-card-content>

            </div>
        </div>

    </div>
    <div layout="row" flex>
        <div class="page-delimiter content-block" flex>
            <div class="fit-screen-wrap header-long " layout="column">

                <div layout="row" layout-align="center center">
                    <div data-aos="flip-right" hide-xs="true" flex="60" flex-gt-sm="50"
                         class="md-display-1 md-margin md-padding">
                        <video class="screen" controls>
                            <source type="video/mp4" src="../content/images/bg/bd.mp4"/>
                        </video>
                    </div>
                    <div data-aos="flip-right" hide-gt-xs="true" flex="70"
                         class="md-headline ">
                        <video class="screen" controls>
                            <source type="video/mp4" src="../content/images/bg/bd.mp4"/>
                        </video>
                    </div>

                </div>
            </div>
            <div class="overlay-description"></div>
        </div>
    </div>
     <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> ПЕРЕВТІЛЕННЯ</div>
            </div>
        </div>
    </div>
 <div layout="row" layout-align="center center">

        <div flex flex-gt-md="60" flex-md="80">
            <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="master in $ctrl.masters"
                         class="md-margin " flex-gt-md="22" flex-md="22" flex-gt-xs="46" flex-xs="80"
                         ng-click="::vm.showMediaObserver(vm.course.hearFormsPhotos, $index)">
                    <card-image-container>
                        <img ng-src="{{::master.photo.url}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::master.name}}</span>
                    </md-card-content>

            </div>
        </div>

    </div>
</div>



`;

export class SalonHomeComponentController {

    static $inject = [FavorResourceName, MasterResourceName, 'smoothScroll', "$location", 'constants'];

    favors:IFavor[];
    masters:IMaster[];
    days = [
        {
            name: "ПОНЕДІЛОК",
            program: '09:00- 19:00',
        },
        {
            name: "ВІВТОРОК",
            program: '09:00- 19:00',
        }, {
            name: "СЕРЕДА",
            program: '09:00- 19:00',
        }, {
            name: "ЧЕТВЕР",
            program: '09:00- 19:00',
        }, {
            name: "П`ЯТНИЦЯ",
            program: '09:00- 19:00',
        }, {
            name: "СУБОТА",
            program: '09:00- 17:00',
        }, {
            name: "НЕДІЛЯ",
            program: 'закрито',
        }];
    categories:any;

    constructor(private favorResource:IFavorResource,
                private masterResource:IMasterResource,
                private smoothScroll, private $location:ng.ILocationService, private constants:IConstants) {

        this.masters = this.masterResource.query();
        this.categories = this.constants.favorCategories;
    }

    scrollToMain() {
        var options = {
            duration: 400,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById( 'mainContent' );
        this.smoothScroll( element, options );
    }

    showFavors(category:String) {
        this.$location.path( `/favor/${category}` );
    }
}

export let SalonHomeComponentUrl = "/home";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
