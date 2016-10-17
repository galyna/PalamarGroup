import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";


const template = `<div class="salon-contacts description-container" layout="column">

    <!--author-->
    <div layout="column" layout-align="center center" >
    <div class="course-bg " layout-align="center center" flex
         ng-repeat="contact in $ctrl.contacts track by $index">
        <div hide show-gt-xs="true" layout="row" layout-align="center center">

            <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
            >
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex="50"><img src="{{::contact.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор</div>
                                <div class="md-display-1">{{::contact.name}}</div>
                                <div class="descr-container">
                                    <div class="md-display-1">{{::contact.phone}}</div>
                                </div>
                            </md-card-title-text>
                        </md-card-title>

                    </div>
                </md-card-content>
            </md-card>
            <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор</div>
                                <div class="md-display-1">{{::contact.name}}</div>
                                <div class="descr-container">
                                    <div class="md-display-1">{{::contact.phone}}</div>
                                </div>
                            </md-card-title-text>
                        </md-card-title>

                    </div>
                    <div class="card-media " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex="50"><img src="{{::contact.photo.url}}" class="md-card-image"/></div>
                </md-card-content>
            </md-card>
            <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex="50"><img src="{{::contact.photo.url}}" class="md-card-image "/>
                    </div>
                    <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                         data-aos-easing="ease-out-cubic"
                         flex layout="column" layout-align="center center">
                        <md-card-title flex>
                            <md-card-title-text layout-align="space-around center">
                                <div class="md-title">Координатор</div>
                                <div class="md-display-1">{{::contact.name}}</div>
                                <div class="descr-container">
                                    <div class="md-display-1">{{::contact.phone}}</div>
                                </div>
                            </md-card-title-text>
                        </md-card-title>

                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div hide-gt-xs="true" layout="row" layout-align="center center">
            <div class="overlay-bg trigger-right"></div>
            <md-card md-whiteframe="8">
                <md-card-content layout="column">
                    <div class="card-media "><img src="{{::contact.photo.url}}" class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="space-around center">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline">{{::contact.name}}</div>
                                <div class="md-headline">{{::contact.phone}}</div>
                            </md-card-title-text>
                        </md-card-title>
                    </div>
                </md-card-content>

            </md-card>
        </div>
    </div>

    <ui-gmap-google-map id="m4ap" layout="row" class="top-info angular-google-map-container-academy"
                        layout-align="center center" center='$ctrl.map.center' zoom='$ctrl.map.zoom'>
        <ui-gmap-marker coords='$ctrl.marker' idkey="8552452588">

        </ui-gmap-marker>
        </ui-gmap-markers>
    </ui-gmap-google-map>
    </div>
</div>
`;

export class AcademyContactComponentController {

    static $inject = [ContactResourceName, OrderResourceName, '$log', '$mdDialog', 'Upload',
        ModelResourceName, 'constants', '$rootScope', '$templateCache'];


    order:IOrder;
    newModel:IModel;
    showAnimation:boolean;
    contacts:IContact[];
    map:any;
    marker:any;

    constructor(private contactResource:IContactResource,
                private OrderResource:IOrderResource, private $log:ng.ILogService,
                private mdDialog:ng.material.IDialogService, private Upload:ng.angularFileUpload.IUploadService,
                private ModelResource:IModelResource,
                private constants:IConstants, private $rootScope:IRootScope,
                private $templateCache:ng.ITemplateCacheService) {
        this.map = {center: {latitude: 49.811077, longitude: 23.973777}, zoom: 18};
        this.marker = {latitude: 49.811077, longitude: 23.973777};
        this.order = new OrderResource();
        this.showAnimation = $rootScope.isBigSize;
        this.newModel = this.getBlankModel();
        this.contacts = this.contactResource.query( {query: {'isAcademy': 'true'}} );

    }


    showModelDialog($event):void {
        this.newModel = this.getBlankModel();

        this.mdDialog.show( {
            template: this.$templateCache.get( "app/courses/views/model.form.html" ).toString(),
            clickOutsideToClose: true,
            bindToController: true,
            controller: AcademyContactComponentController,
            controllerAs: 'vm',
            parent: angular.element( document.body ),
            targetEvent: $event
        } );
    }


    saveModelPhoto(file, photoName):void {
        if (!file) return;
        this.fileUpload( file ).then( (response)=> {
            this.newModel[photoName] = response.data.url;
        } ).catch( (err)=> {
            this.$log.debug( "fail upload file..." + err );
        } )
    }

    fileUpload(file) {
        return this.Upload.upload<{url:string}>( {
            method: 'POST',
            url: this.constants.photoUrl,
            data: {file: file}
        } );
    }


    submitModel():void {
        this.newModel.$save()
            .then( () => {
                this.mdDialog.hide();
                this.showModelConfirm();
            } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            );
    }

    showModelConfirm():void {

        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Вашу заявку стати моделлю прийнято. ' )
                .textContent( 'На протязі дня з вами зв`яжеться координатор акодемії. Дякуємо.' )
                .ariaLabel( 'Вашу заявку прийнято.j ' )
                .ok( 'Закрити' )
        );

    }

    showOrderDialog($event):void {

        this.mdDialog.show( {
            template: this.$templateCache.get( "app/courses/views/order.html" ).toString(),
            clickOutsideToClose: true,
            bindToController: true,
            controller: AcademyContactComponentController,
            controllerAs: 'vm',
            parent: angular.element( document.body ),
            targetEvent: $event,
        } );

    }

    showOrderConfirm():void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Вашу заявку прийнято. ' )
                .textContent( 'На протязі дня з вами зв`яжеться координатор акодемії. Дякуємо.' )
                .ariaLabel( 'Вашу заявку прийнято. ' )
                .ok( 'Закрити' )
        );

    }

    submitOrder(form):void {
        this.order.$save().then( () => {
            this.mdDialog.hide();
            this.showOrderConfirm();
        } )
            .catch( (err) => {
                this.$log.error( err );
            } )
            .finally( () => {
                this.order = new this.OrderResource();
            } );


    }

    cancel():void {
        this.mdDialog.hide();
    }

    private getBlankModel() {
        return new this.ModelResource( {
            fasPhotoUrl: '../content/images/models/fas.jpg',
            profilePhotoUrl: '../content/images/models/prifile.jpg',
            backPhotoUrl: '../content/images/models/back.jpg',
            fullSizePhotoUrl: '../content/images/models/fullsize.jpg'
        } );
    }
}
export let AcademyContactComponentUrl = "/academycontact";
export let AcademyContactComponentName = 'pgAcademyContact';
export let AcademyContactComponentOptions = {
    template: template,
    controller: AcademyContactComponentController
};