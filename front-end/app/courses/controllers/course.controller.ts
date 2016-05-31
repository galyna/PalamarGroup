import {ICourseService} from "../../services/course.service";
import {IModelService} from "../services/model.service";

import ICourse = pg.models.ICourse;
import IOrder = pg.models.IOrder;
import IModel = pg.models.IModel;
import {IConstants} from "../app.config";
import IUploadPromise = angular.angularFileUpload.IUploadPromise;


interface IRouteParams extends ng.route.IRouteParamsService {
    id:string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', 'courseService',
        'orderService', 'mediaObserver', '$mdDialog', 'Upload', '$timeout', 'modelService','constants'];
    static componentName = 'CourseController';

    course:ICourse;
    order:IOrder;
    orderFormVisible:boolean;
    modelFormVisible:boolean;
    newModel:IModel;

    constructor(private $log:ng.ILogService, $routeParams:IRouteParams,
                private $location:ng.ILocationService, courseService:ICourseService,
                private orderService:ICourseService, private mediaObserver, private mdDialog,
                private Upload:ng.angularFileUpload.IUploadService, private $timeout:ng.ITimeoutService,
                private modelService:IModelService,private constants:IConstants) {

        courseService.get($routeParams.id).then((course) => {
            this.course = course;
        }).catch(function (err) {
            $log.error(err);
        });

        this.order = {
            name: '',
            phone: '',
            email: '',
            comment: '',
            date: '',
            admin_comment: '',
            event_id: '',
            answered: false,
            booked: false
        };

        this.newModel =  angular.copy(this.constants.newModel);

    }

    backToHome():void {
        this.$location.url('/home');
    }

    showModelForm():void {
        this.newModel =  angular.copy(this.constants.newModel);
        this.modelFormVisible = true;
    }

    hideModelForm():void {
        this.modelFormVisible = false;
    };

    saveModelPhoto(file,photoName):void {
        if(!file) return;
        this.fileUpload(file).then((response)=> {
            this.newModel[photoName] = response.data.url;
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        })
    }

    fileUpload(file) {
        return this.Upload.upload<{url:string}>({
            method: 'POST',
            url: this.constants.photoUrl,
            data: {file: file}
        });
    }


    submitModel():void {
            this.modelService.post(this.newModel)
                .then(() => {
                    this.showModelConfirm();
                })
                .catch((err) => {
                        this.$log.error(err);
                    }
                ).finally(()=> {
                this.$timeout(()=> {
                    this.hideModelForm();
                });
            });

    }

    showModelConfirm():void {

        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу заявку стати моделлю прийнято. ')
                .textContent('На протязі дня з вами зв`яжеться координатор курсів. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято.j ')
                .ok('Закрити')
        );

    }

    showOrderConfirm():void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу заявку прийнято. ')
                .textContent('На протязі дня з вами зв`яжеться координатор курсів. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }

    submitOrder():void {
        if (this.order.email || this.order.phone || this.order.name) {
            this.order.event_id = this.course._id;
            this.order.date = new Date().toJSON();
            this.orderService.post(this.order)
                .then(() => {
                    this.hideForm();
                    this.showOrderConfirm();
                })
                .catch((err) => {
                    this.$log.error(err);
                });
        }
    }

    showForm():void {
        this.orderFormVisible = true;
    }

    hideForm():void {
        this.orderFormVisible = false;
    };

    showMediaObserver(items, index):void {
        this.mediaObserver.observe(items, index);
    }
}