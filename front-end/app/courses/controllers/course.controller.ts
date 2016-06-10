import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";
import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";
import {IComment, ICommentResource, CommentResourceName} from "../../resources/comment.resource";
import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";


interface IRouteParams extends ng.route.IRouteParamsService {
    id:string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', CourseResourceName,
        OrderResourceName, MediaObserverFactoryName, '$mdDialog', 'Upload',
        '$timeout', ModelResourceName, 'constants', CommentResourceName, '$anchorScroll',];
    static componentName = 'CourseController';

    course:ICourse;
    order:IOrder;
    orderFormVisible:boolean;
    modelFormVisible:boolean;
    newModel:IModel;
    newComment:IComment;


    constructor(private $log:ng.ILogService, $routeParams:IRouteParams,
                private $location:ng.ILocationService, private CourseResource:ICourseResource,
                private OrderResource:IOrderResource, private mediaObserver:IMediaObserverFactory,
                private mdDialog:ng.material.IDialogService, private Upload:ng.angularFileUpload.IUploadService,
                private $timeout:ng.ITimeoutService, private ModelResource:IModelResource,
                private constants:IConstants, private CommentResource:ICommentResource,private $anchorScroll:ng.IAnchorScrollService) {

        this.course = CourseResource.get( {id: $routeParams.id, populate: "comments"} );

        this.order = new OrderResource();

        this.newComment = new CommentResource();

        this.newModel = this.getBlankModel();

    }


    backToHome():void {
        this.$location.url( '/home' );
    }

    scrollToComments():void {
        this.$location.hash('comments');
        // call $anchorScroll()
        this.$anchorScroll();
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
            this.order.date = new Date().toJSON();
            this.order.$save()
                .then( () => {
                    this.hideForm();
                    this.showOrderConfirm();
                } )
                .catch( (err) => {
                    this.$log.error( err );
                } );
        }
    }

    submitComment():void {

        this.CourseResource.addComment( {id: this.course._id}, this.newComment ).$promise.then( () => {
                this.showCommentConfirm();
            } )
            .catch( (err) => {
                    this.$log.error( err );
                }
            ).finally( ()=> {
            this.$timeout( ()=> {
                this.newComment = new this.CommentResource();
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

    private getBlankModel() {
        return new this.ModelResource( {
            fasPhotoUrl: '../content/images/fas.jpg',
            profilePhotoUrl: '../content/images/prifile.jpg',
            backPhotoUrl: '../content/images/back.jpg',
            fullSizePhotoUrl: '../content/images/fullsize.jpg'
        } );
    }

}