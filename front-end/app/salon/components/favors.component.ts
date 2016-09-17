import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
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
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="favor in $ctrl.favors"
                         class="md-margin " flex-gt-md="22" flex-md="22" flex-gt-xs="46" flex-xs="80"
                         ng-click="::vm.showMediaObserver(vm.course.hearFormsPhotos, $index)">
                    <card-image-container>
                        <img ng-src="{{::favor.photo.url}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::favor.name}}</span>
                    </md-card-content>

            </div>
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
</div>`;

export class FavorsComponentController {

    static $inject = [FavorResourceName, MasterResourceName,  "$routeParams"];

    favors:IFavor[];
    masters:IMaster[];
    
    constructor(private favorResource:IFavorResource,
                private masterResource:IMasterResource,
                private $routeParams:ng.route.IRouteParamsService) {

    }

    $onInit() {
        if (this.$routeParams["category"]) {
          this.favors=  this.favorResource.query();
            this.favors.$promise.then( (favors) => {

                } );
        } else {

        }
    }
}

export let FavorsComponentUrl = "/favors/:id";
export let FavorsComponentName = 'pgFavors';
export let FavorsComponentOptions = {
    template: template,
    controller: FavorsComponentController
};