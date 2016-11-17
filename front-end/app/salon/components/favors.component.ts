import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";

const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">


    <div ng-repeat="category in  $ctrl.categories track by $index">

        <div layout="row" flex ng-if="category.favors.length>0">
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> {{::category.name}}</div>
                </div>

            </div>
        </div>

        <div layout="row" layout-align="center center" ng-if="category.favors.length>0 ">
            <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
                <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" ng-repeat="favor in category.favors track by $index"
                             class="md-margin "
                             ng-attr-flex-gt-sm="46"
                             flex-gt-xs="46" flex-xs="80"
                             ng-click="::$ctrl.showFavor(favor._id)">

                        <img ng-src="{{::favor.photo.url}}" class="md-card-image">                                 
                    <md-card-content layout="column" class="  show-description-favor" layout-align="center center">
                        <span class="  md-margin">{{::favor.name}}</span>
                         <div class=" md-margin show-description-content">{{::favor.description}}</div>
                       
                    </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>
    </div>
</div>
</div>   
`;


export class FavorsComponentController {

    static $inject = [FavorResourceName, 'constants', "$routeParams", "$location"];

    favors: any;
    masters: IMaster[];
    categories: any;
    markerReadySEO: string;

    constructor(private favorResource: IFavorResource, private constants: IConstants,
                private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService,) {


    }

    $onInit() {
        this.favors = [];
        this.categories = angular.copy(this.constants.favorCategories);
        this.favorResource.query({sort: "order"}).$promise.then((favors) => {
            this.favors = favors;
            if (this.favors.length > 0) {

                this.categories.forEach((category)=> {
                    category.favors = favors.filter((favor)=> {
                        return category.name == favor.category.name;
                    });

                    this.markerReadySEO = "dynamic-content";
                })
            }

        });

    }


    showFavor(id) {
        this.$location.path(`/beauty-parlour/service/${id}`);
    }


    getPictureFlex(index, length) {
        if (length < 3 || (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 ))) {
            return 46;
        } else {
            return 22;
        }
    }
}

export let FavorsComponentUrl = "/beauty-parlour/services";
export let FavorsComponentName = 'pgFavors';
export let FavorsComponentOptions = {
    template: template,
    controller: FavorsComponentController
};