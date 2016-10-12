import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IRootScope} from "../../../typings";


const template = `<div class="courses-details description-container" layout="column">

    <!--author-->
    <div ng-repeat="contact in $ctrl.contacts" layout="row" class="top-info" flex layout-align="center center">
        <md-card  flex-md="90" flex-gt-md="60" flex-xs="none" flex
                 md-whiteframe="5">
            <md-card-content layuot="column" layout-gt-sm="row">
                <div class="card-desc-top " flex hide-gt-sm="true" layout="column" layout-align=" space-around center">
                    <md-card-title>
                        <md-card-title-text flex layout="column" layout-align=" space-around center">
                            <div class="md-display-1">ТЕЛЕФОН</div>
                            <div class="md-display-1">{{contact.phone}}</div>
                        </md-card-title-text>
                    </md-card-title>
                </div>
                <div class=" card-media" layout="column" data-aos="{{{true:'fade-left', false:''}[vm.showAnimation]}}"
                     data-aos-easing="ease-out-cubic"
                     flex-gt-sm="50" layout-align="center center">
                    <img src="{{contact.photo.url}}"/>
                    <div class="md-padding author-name" layout="column" layout-align="space-around center">
                        <div class="md-headline">КООРДИНАТОР</div>
                        <div class="md-headline">{{ contact.name}}</div>
                    </div>
                </div>
                <div class="card-desc " data-aos="{{{true:'fade-right', false:''}[vm.showAnimation]}}"
                     data-aos-easing="ease-out-cubic" flex-gt-sm="50"
                     layout="column" layout-align=" space-between center">
                    
                    <md-card-title layout="column" layout-align="space-around center">
                        <md-card-title-text hide show-gt-sm="true" flex layout="column"
                                            layout-align=" space-around center">
                           <div class="md-display-1">ТЕЛЕФОН</div>
                            <div class="md-display-1">{{contact.phone}}</div>
                        </md-card-title-text>
                       
                    </md-card-title>

                    <div flex layuot="column" layout-align="space-between stretch">

                        <md-button class="md-raised " flex aria-label="Play" ng-click="$ctrl.showModelDialog($event)">
                            Стати моделлю
                        </md-button>
                        <md-button class=" md-raised xs-selected " aria-label="Play"
                                   ng-click="$ctrl.showOrderDialog($event)">
                            Записатись
                        </md-button>
                        
                       <div class="md-padding md-margin" layout="column" layout-gt-sm="row"
                             layout-align="center center">
                
                            <div class=" md-title social-image-container" layout="row"
                                 layout-align="center center">

                                <div flex>{{contact.email}} .</div>
                            </div>
                        </div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</div>`;

export class AcademyContactComponentController {

    static $inject = [ ContactResourceName,OrderResourceName,'$log', '$mdDialog', 'Upload',
         ModelResourceName, 'constants','$rootScope','$templateCache'];



    order:IOrder;
    newModel:IModel;
    showAnimation:boolean;
    contacts:IContact[];

    constructor(private contactResource:IContactResource,
                private OrderResource:IOrderResource,private $log:ng.ILogService,
                private mdDialog:ng.material.IDialogService,  private Upload:ng.angularFileUpload.IUploadService,
                private ModelResource:IModelResource,
                private constants:IConstants,private $rootScope:IRootScope,
                private $templateCache:ng.ITemplateCacheService) {

        this.order = new OrderResource();
        this.showAnimation = $rootScope.isBigSize;
        this.newModel = this.getBlankModel();
        this.contacts = this.contactResource.query( {query:{'isAcademy': 'true'}});
        // contacts.$promise.then( (contacts) => {
        //         this.contacts = contacts.filter( (contact)=> {
        //             return contact.isAcademy;
        //         } )
        //     }
        // );
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