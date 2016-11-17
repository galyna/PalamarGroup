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

                        <img ng-src="{{::favor.photo.url}}" >                                 
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
  <div class="courses-details description-container" layout="column">
    <div layout="row" ng-if="$ctrl.videos.length>0 || $ctrl.photos.length>0" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  header-super">
                <div flex class="md-display-2"> Роботи та навчання</div>
            </div>
            <div class="overlay-days">
            </div>
        </div>
    </div>

 <div >
    <div layout="row" layout-align="center center" >
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6" class="  courses-videos" 
                         ng-repeat="video in $ctrl.videos  track by $index"
                         flex>
                    <div flex class="embed-responsive embed-responsive-16by9">
                        <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                       video-id="::video.url"></youtube-video>
                    </div>
                    <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::video.name}}</span>
                    </md-card-content>
                </md-card>
            </div>
        </div>

    </div>

     <div layout="row" layout-align="center center" >
        <div  flex flex-gt-md="60" flex-md="80"  flex-gt-xs="60">
         <div  class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                <md-card md-whiteframe="6"  ng-repeat="photo in $ctrl.photos  track by $index"
                         class="md-margin " flex-gt-sm="22"  flex-gt-xs="46" flex-xs="80"
                         ng-click="::$ctrl.showMediaObserver(transform.photos, $index)">                  
                        <img ng-src="{{::photo.url}}" class="md-card-image">
                    <md-card-content ng-if="photo.name" layout="column" flex="100" layout-align="center center">
                        <span class="  md-margin">{{::photo.name}}</span>
                    </md-card-content>
</md-card>
            </div>
            
        </div>
         
    </div>
 </div>   
</div>
`;


export class FavorsComponentController {

    static $inject = [FavorResourceName, 'constants', "$routeParams", "$location", 'orderByFilter'];

    favors: any;
    masters: IMaster[];
    categories: any;
    markerReadySEO: string;
    photos: any;
    videos: any;

    constructor(private favorResource: IFavorResource, private constants: IConstants,
                private $routeParams: ng.route.IRouteParamsService,
                private $location: ng.ILocationService, private orderByFilter: ng.IFilterOrderBy) {


    }

    $onInit() {
        this.favors = [];
        this.photos = [];
        this.videos = [];
        this.categories = angular.copy(this.constants.favorCategories);
        this.favorResource.query({sort: "order"}).$promise.then((favors) => {
            this.favors = favors;
            if (this.favors.length > 0) {

                this.categories.forEach((category)=> {
                    var catVideo = [];
                    var catPhoto = [];
                    category.favors = favors.filter((favor)=> {
                        if (category.name == favor.category.name) {
                            catPhoto = catPhoto.concat(this.loadPhoto(favor));
                            catVideo = catVideo.concat(this.loadVideo(favor));
                        }
                        return category.name == favor.category.name;
                    });

                    catPhoto.splice(5, catPhoto.length - 6)
                    catVideo.splice(0, catVideo.length - 1)
                    this.photos = this.photos.concat(catPhoto);
                    this.videos = this.videos.concat(catVideo);
                    catVideo = [];
                    catPhoto = [];
                })

                this.markerReadySEO = "dynamic-content";
            }

        });

    }

    loadPhoto(favor) {
        var temp = []
        if (favor.photos && favor.photos.length > 0) {
            var ph = this.orderByFilter(favor.photos, "order");
            temp.push(ph[0])
        }
        return temp
    }

    loadVideo(favor) {
        var temp = []
        if (favor.videos && favor.videos.length > 0) {
            var vi = this.orderByFilter(favor.videos, "order");
            temp.push(vi[0])
        }
        return temp

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