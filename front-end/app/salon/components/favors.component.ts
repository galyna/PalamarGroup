import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
const template = `<div class="courses-details description-container" layout="column">
   

 <div ng-repeat="category in  $ctrl.categories">
 
  <div layout="row" flex ng-if="category.favors.length>0">
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> {{category.name}}</div>
            </div>

        </div>
    </div>

     <div layout="row" layout-align="center center" >
        <div  flex flex-gt-md="60" flex-md="80"  flex-gt-xs="60">
         <div  class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="favor in category.favors"
                         class="md-margin " flex-gt-sm="46"  flex-gt-xs="46" flex-xs="80"
                         ng-click="$ctrl.showFavor(favor._id)">
                    <card-image-container>
                        <img ng-src="{{::favor.photo.url}}" class="md-card-image">
                    </card-image-container>
                    <md-card-content ng-if="favor.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::favor.name}}</span>
                    </md-card-content>

            </div>
            
        </div>
         
    </div>
 </div>   
</div>

`;

export class FavorsComponentController {

    static $inject = [FavorResourceName, 'constants', "$routeParams", "$location"];

    favors:any;

    categories:any;

    constructor(private favorResource:IFavorResource,
                private constants:IConstants,
                private $routeParams:ng.route.IRouteParamsService, private $location:ng.ILocationService) {
        this.categories = this.constants.favorCategories;
    }

    $onInit() {
        if (this.$routeParams["category"] && this.$routeParams["category"]!=":category") {
        
            this.favors = this.favorResource.query();
            this.favors.$promise.then( (favors) => {
                this.categories.forEach( (category)=> {
                    category.favors = favors.filter( (favor)=> {
                        return category.name == favor.category.name && category._id==this.$routeParams["category"];
                    } );

                } )
            } );
        } else {
            this.favors = this.favorResource.query();
            this.favors.$promise.then( (favors) => {
                this.categories.forEach( (category)=> {
                    category.favors = favors.filter( (favor)=> {
                        return category.name == favor.category.name;
                    } );

                } )
            } );
        }
    }

    showFavor(id) {
        this.$location.path( `/favor/${id}` );
    }
}

export let FavorsComponentUrl = "/favors/:category";
export let FavorsComponentName = 'pgFavors';
export let FavorsComponentOptions = {
    template: template,
    controller: FavorsComponentController
};