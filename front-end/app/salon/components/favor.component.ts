import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {FavorResourceName, IFavorResource, IFavor} from "../../resources/favor.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";
import {MediaObserverFactoryName, IMediaObserverFactory} from "../../ui/mediaObserver.service";
import {IConstants} from "../../core/core.config";
import {IRootScope} from "../../../typings";

const template = `<div class="courses description-container">
 

        <div class="course-bg " layout-align="center center" flex layout="column" >
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">

                        <div class="card-desc "
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-md="true" class="md-display-2 capitalize">{{::$ctrl.favor.name}}
                                    </div>
                                    <div hide-md="true" class="md-display-1">{{::$ctrl.favor.name}}</div>
                                    <div class="favor-container ">
                                        <div class="md-title">{{::$ctrl.favor.description}}</div>

                                    </div>
                                </md-card-title-text>
                            </md-card-title>

                        </div>
                        <div class="card-media "
                             flex="50"><img ng-src="{{::$ctrl.favor.photo.url}}" class="md-card-image "/>
                        </div>
                    </md-card-content>
                </md-card>

            </div>

            <div hide-gt-xs="true" layout="row" layout-align="center center">
               
                <md-card md-whiteframe="8">
                    <md-card-content layout="column">
                        <div class="card-media "><img ng-src="{{::$ctrl.favor.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline capitalize md-margin">{{::$ctrl.favor.name}}</div>
                                    <div class="md-title">{{::$ctrl.favor.description}}</div>
                                </md-card-title-text>
                            </md-card-title>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    
    <div layout="row" ng-if="$ctrl.masters.length>0" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap  header-super">
                <div flex class="md-display-2"> Майстри</div>
            </div>
            <div class="overlay-masters">
            </div>
        </div>
    </div>

    <div class="course-bg " layout="column" flex
         ng-repeat="master in $ctrl.masters | orderBy:['-level._id','order'] track by $index" layout-align="center center"  >
    <div hide show-gt-xs="true" layout="row" layout-align="center center">

        <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
            <md-card-content layout="row" layout-align="start none">
                <div class="card-media "
                     flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element "
                                    ng-click="::$ctrl.showMaster(master._id)"/>
                </div>
                <div class="card-desc box" flex="50" layout="column" layout-align="space-around center">
                    <div ng-if="master.level" hide show-md="true" class="corner-ribbon top-right white"
                    >
                        {{::master.level.text}}
                    </div>
                    <div ng-if="master.level" hide-md="true" class="corner-ribbon-min top-right white"
                    >
                        {{::master.level.text}}
                    </div>
                    <div layout="row" layout-align="center center" class="md-padding md-margin">
                        <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                        <div hide show-sm="true" flex="90" class="md-display-1">{{::master.name}}
                        </div>
                    </div>
                    <md-button class="  md-display-1 md-raised  " aria-label="Details"
                               ng-click="::$ctrl.showMaster(master._id)">
                        Про майстра
                    </md-button>
                    <md-button class=" near-master xs-selected md-display-1 md-raised " aria-label="Details"
                               ng-click="::$ctrl.showAppointmentDialog(master)">
                        Записатись
                    </md-button>

                </div>
            </md-card-content>
        </md-card>

    </div>

    <div hide-gt-xs="true" layout="row" layout-align="center center">
        
        <md-card md-whiteframe="8">
            <md-card-content layout="column">
                <div ng-if="master.level" class="card-desc-top-master"
                     ng-class="{'grey': master.level._id==='1','white': master.level._id==='0'}" flex
                     layout="column"
                     layout-align=" space-around center" >
                    <md-card-title>
                        <md-card-title-text flex layout="column" layout-align=" space-around center">
                            <div class="md-headline">{{::master.level.text}}</div>
                        </md-card-title-text>
                    </md-card-title>
                </div>
                <div class="card-media "><img ng-src="{{master.photo.url}}" class="md-card-image"
                                              ng-click="::$ctrl.showMaster(master._id)"/></div>
                <div class="card-desc "
                     layout="column" layout-align="center center">
                    <md-card-title>
                        <md-card-title-text>
                            <div class="md-headline capitalize md-padding">{{::master.name}}</div>
                            <div class="md-title">{{::master.description}}</div>
                        </md-card-title-text>
                    </md-card-title>
                    <md-button class=" md-display-1 md-raised " aria-label="Details"
                               ng-click="::$ctrl.showMaster(master._id)">
                        Про майстра
                    </md-button>
                    <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                               ng-click="::$ctrl.showAppointmentDialog(master)">
                        Записатись
                    </md-button>
                </div>
            </md-card-content>

        </md-card>

    </div>
   </div> 
   
    
</div>
    
    <div class="courses-details description-container" layout="column">
    <div layout="row" ng-if="$ctrl.favor.videos.length>0 || $ctrl.favor.photos.length>0" flex>
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
            <div layout="column" layout-margin  layout-align="center center" class="embed-responsive-container">
                <md-card md-whiteframe="6" class="  courses-videos" 
                         ng-repeat="video in $ctrl.favor.videos | orderBy:'order' track by $index"
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
                <md-card md-whiteframe="6"  ng-repeat="photo in $ctrl.favor.photos | orderBy:'order' track by $index"
                         class="md-margin " ng-attr-flex-gt-sm="{{::$ctrl.getPictureFlex($index,transform.photos.length)}}"  flex-gt-xs="46" flex-xs="80"
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

export class FavorComponentController {

    static $inject = ["$routeParams", "$location",
        FavorResourceName, MasterResourceName,
        AppointmentResourceName, AppointmentServiceName, MediaObserverFactoryName, 'constants', '$rootScope',];

    favor: IFavor;
    masters: IMaster[];
    socialParams: any;

    constructor(private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService,
                private favorResource: IFavorResource, private masterResource: IMasterResource,
                private AppointmentResource: IAppointmentResource,
                private AppointmentService: IAppointmentService, private mediaObserver: IMediaObserverFactory,
                private constants: IConstants,
                private $rootScope: IRootScope,) {

    }

    $onInit() {
        if (this.$routeParams["id"]) {
            this.favorResource.get({id: this.$routeParams["id"]}).$promise
                .then((favor) => {
                    this.favor = favor;

                }).catch((err)=> {
                this.$location.path(`/beauty-parlour/services`);
            });

            this.masterResource.query({
                populate: 'services.favor'
            }).$promise
                .then((masters) => {
                    this.masters = masters.filter((master)=> {
                        return master.services.some((s)=> {
                            if (s.favor._id == this.$routeParams["id"]) {
                                master.level = s.level;
                                return true;
                            } else {
                                return false;
                            }

                        });
                    })
                });

        }
    }

    showMaster(id) {
        this.$location.path(`/beauty-parlour/master/${id}`);
    }

    showAppointmentDialog(master) {
        var appointment = new this.AppointmentResource();
        appointment.master = master;

        var matched = master.services.find((s)=> {
            return s.favor._id == this.favor._id
        })
        if (matched) {
            appointment.service = matched;
        }

        this.AppointmentService.onShowDialog(appointment);


    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }


    setSocialParams(photo) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/beauty-parlour/service/" + this.favor._id;
        this.$rootScope.socialParams.image = this.constants.host + photo.url;
        this.$rootScope.socialParams.title =  this.favor.name;
        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }
    showMediaObserver(items, index): void {
        this.setSocialParams(items[index]);
        this.mediaObserver.observe(items, index, this.socialParams);
    }

}

export let FavorComponentUrl = "/beauty-parlour/service/:id";
export let FavorComponentName = 'pgFavor';
export let FavorComponentOptions = {
    template: template,
    controller: FavorComponentController
};