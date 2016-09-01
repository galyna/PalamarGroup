import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";

import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";

const template = `<div class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div class="course-bg " layout-align="center center" flex
            
            >
       

            <div  layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(courses[0]._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::courses[0].avatar}}" class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">Стрижка</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                            >Деталі
                            </md-button>
                        </div>
                    </md-card-content>

                </md-card>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::courses[0].avatar}}" class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">{{::course.name}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                            >Деталі
                            </md-button>
                        </div>
                    </md-card-content>

                </md-card>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="{{::courses[0].avatar}}" class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">{{::course.name}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                            >Деталі
                            </md-button>
                        </div>
                    </md-card-content>

                </md-card>
    
            </div>
        </div>
    </div>
</div>


`;

export class SalonHomeComponentController {

    static $inject = [ CourseResourceName, 'orderByFilter'];


    courses:ICourse[];



    constructor( private CourseResource:ICourseResource
              ) {

        this.courses = this.CourseResource.query();
        this.courses.$promise.then( (courses) => {
               var y="";
            }
        );
    }
}

export let SalonHomeComponentUrl = "/home";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
