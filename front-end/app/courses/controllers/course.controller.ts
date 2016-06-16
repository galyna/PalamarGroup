import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";

import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";


interface IRouteParams extends ng.route.IRouteParamsService {
    id:string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', CourseResourceName,
        OrderResourceName, MediaObserverFactoryName, '$mdDialog', 'Upload',
        '$timeout', ModelResourceName, 'constants', '$anchorScroll', "$filter"];
    static componentName = 'CourseController';

    course:ICourse;
    order:IOrder;
    orderFormVisible:boolean;
    modelFormVisible:boolean;
    newModel:IModel;
    newComment:any;
    localURL:string;
    localContentURL:string;


    constructor(private $log:ng.ILogService, $routeParams:IRouteParams,
                private $location:ng.ILocationService, private CourseResource:ICourseResource,
                private OrderResource:IOrderResource, private mediaObserver:IMediaObserverFactory,
                private mdDialog:ng.material.IDialogService, private Upload:ng.angularFileUpload.IUploadService,
                private $timeout:ng.ITimeoutService, private ModelResource:IModelResource,
                private constants:IConstants, private $anchorScroll:ng.IAnchorScrollService, private $filter) {

        this.course = CourseResource.get( {id: $routeParams.id} );

        this.order = new OrderResource();

        this.newComment = this.getBlankComment();

        this.newModel = this.getBlankModel();
        
      //  this.localURL = $location.absUrl();
       // this.localContentURL= $location.protocol() + "://" + $location.host() + ":" + $location.port();
        //TODO
        this.localURL = 'http://54.191.26.39:8080';
        this.localContentURL= 'http://54.191.26.39:8080';
    }

    getFBDescription():string {
        if (this.course.courseModulesDates) {
            let desc = "Запрошуємо на курс, який проволиться у Львові. Дати проведення: ";
            desc += this.course.courseModulesDates.map( (modulesDate)=> {
                    return this.$filter( 'date' )( modulesDate, "dd.MM.yyyy" );
                } ).join( ', ' ) + ". ";

            desc += this.course.description;
            return desc.slice( 0, 949 );

        } else {
            return "";
        }
        ;
    }

    getDates():string {
        if (this.course.courseModulesDates) {

            return this.course.courseModulesDates.map( (modulesDate)=> {
                    return this.$filter( 'date' )( modulesDate, "dd.MM.yyyy" );
                } ).join( ', ' ) + ". ";

        } else {
            return "";
        }
        ;
    }

    backToHome():void {
        this.$location.url( '/home' );
    }

    scrollToComments():void {
        this.$location.hash( 'comments' );
        // call $anchorScroll()
        this.$anchorScroll();
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

    showModelForm():void {
        this.newModel = this.getBlankModel();
        this.modelFormVisible = true;
    }

    hideModelForm():void {
        this.modelFormVisible = false;
    };

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
                this.showModelConfirm();
            } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            ).finally( ()=> {
            this.$timeout( ()=> {
                this.hideModelForm();
            } );
        } );

    }

    showModelConfirm():void {

        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Вашу заявку стати моделлю прийнято. ' )
                .textContent( 'На протязі дня з вами зв`яжеться координатор курсів. Дякуємо.' )
                .ariaLabel( 'Вашу заявку прийнято.j ' )
                .ok( 'Закрити' )
        );

    }

    showOrderConfirm():void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose( true )
                .title( 'Вашу заявку прийнято. ' )
                .textContent( 'На протязі дня з вами зв`яжеться координатор курсів. Дякуємо.' )
                .ariaLabel( 'Вашу заявку прийнято. ' )
                .ok( 'Закрити' )
        );

    }

    submitOrder():void {
        if (this.order.email || this.order.phone || this.order.name) {
            this.order.event_id = this.course._id;
            this.order.event_name = this.course.name;
            this.order.event_dates = this.course.courseModulesDates;
            this.order.date = new Date().toJSON();
            this.order.$save()
                .then( () => {
                    this.hideForm();
                    this.showOrderConfirm();
                } )
                .catch( (err) => {
                    this.$log.error( err );
                } )
                .finally( () => {
                    this.order = new this.OrderResource();
                } );
        }
    }

    submitComment():void {
        this.newComment.date = new Date();
        this.CourseResource.addComment( {id: this.course._id}, this.newComment ).$promise.then( () => {
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

    showForm():void {
        this.orderFormVisible = true;
    }

    hideForm():void {
        this.orderFormVisible = false;
    };

    showMediaObserver(items, index):void {
        this.mediaObserver.observe( items, index );
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
            fasPhotoUrl: '../content/images/fas.jpg',
            profilePhotoUrl: '../content/images/prifile.jpg',
            backPhotoUrl: '../content/images/back.jpg',
            fullSizePhotoUrl: '../content/images/fullsize.jpg'
        } );
    }

}