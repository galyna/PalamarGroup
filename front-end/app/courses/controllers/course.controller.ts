import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";

import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";


interface IRouteParams extends ng.route.IRouteParamsService {
    id:string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', CourseResourceName,
        OrderResourceName, MediaObserverFactoryName, '$mdDialog', 'Upload',
        '$timeout', ModelResourceName, 'constants', "$filter",
        '$rootScope', '$templateCache', '$mdMedia', 'orderByFilter', 'smoothScroll'];
    static componentName = 'CourseController';

    course:ICourse;
    order:IOrder;
    newModel:IModel;
    newComment:any;
    socialParams:any;
    showAnimation:boolean;


    constructor(private $log:ng.ILogService, $routeParams:IRouteParams,
                private $location:ng.ILocationService, private CourseResource:ICourseResource,
                private OrderResource:IOrderResource, private mediaObserver:IMediaObserverFactory,
                private mdDialog:ng.material.IDialogService, private Upload:ng.angularFileUpload.IUploadService,
                private $timeout:ng.ITimeoutService, private ModelResource:IModelResource,
                private constants:IConstants,
                private $filter, private $rootScope:IRootScope, private $templateCache:ng.ITemplateCacheService,
                private $mdMedia:ng.material.IMedia, private orderByFilter:ng.IFilterOrderBy,
                private smoothScroll) {
        this.showAnimation = $rootScope.isBigSize;
       
        this.course = CourseResource.get( {id: $routeParams.id} );
        this.course.$promise.then( (course)=> {

            this.setSocialParams( course );
            course.hearFormsPhotos = this.orderByFilter( course.hearFormsPhotos, "order" );
            course.historyPhotos = this.orderByFilter( course.historyPhotos, "order" );
       
        } );

        this.order = new OrderResource();

        this.newComment = this.getBlankComment();

        this.newModel = this.getBlankModel();

    }


    setSocialParams(course:ICourse) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/#/course/" + course._id;
        this.$rootScope.socialParams.image = this.constants.host + course.avatar;
        this.$rootScope.socialParams.title = course.name;
        this.$rootScope.socialParams.description = course.description.slice( 0, 920 );;
        this.socialParams = angular.copy( this.$rootScope.socialParams, this.socialParams );
    }

    showComments():Boolean {
        if (this.course.comments) {
            return this.course.comments.some( function (value, index, _ary) {
                return value.isVisible;
            } );
        } else {
            return false;
        }

    }

    showModelDialog($event):void {
        this.newModel = this.getBlankModel();

        this.mdDialog.show( {
            template: this.$templateCache.get( "app/courses/views/model.form.html" ).toString(),
            clickOutsideToClose: true,
            bindToController: true,
            controller: CourseController.componentName,
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
            controller: CourseController.componentName,
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

        this.order.event_id = this.course._id;
        this.order.event_name = this.course.name;

        this.order.event_dates = this.course.days.map( (day) => day.date );
        this.order.date = new Date().toJSON();
        this.order.$save()
            .then( () => {
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

    showCommentDialog($event):void {
        this.mdDialog.show( {
            template: this.$templateCache.get( "app/courses/views/comment.form.html" ).toString(),
            clickOutsideToClose: true,
            bindToController: true,
            controller: CourseController.componentName,
            controllerAs: 'vm',
            parent: angular.element( document.body ),
            targetEvent: $event,
        } );

    }

    submitComment():void {
        this.newComment.date = new Date();
        this.CourseResource.addComment( {id: this.course._id}, this.newComment ).$promise.then( () => {
            this.mdDialog.hide();
            this.showCommentConfirm();
        } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            ).finally( ()=> {
            this.$timeout( ()=> {
                this.newComment = this.getBlankComment();
            } );
        } );


    }

    showCommentConfirm():void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Дякуємо за відгук.' )
                .textContent( 'Ваш відгук з`явиться на сайті після модерації.' )
                .ariaLabel( 'Дякуємо за відгук.' )
                .ok( 'Закрити' )
        );

    }


    showMediaObserver(items, index):void {
        this.mediaObserver.observe( items, index, this.socialParams );
    }

    private getBlankComment() {
        return {
            name: "",
            text: "",
            date: "",
            isVisible: false,
            isModerated: false
        };
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