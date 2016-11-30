import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";

import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";


interface IRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', CourseResourceName,
        OrderResourceName, MediaObserverFactoryName, '$mdDialog', 'Upload',
        '$timeout', ModelResourceName, 'constants',
        '$rootScope', '$templateCache', '$mdMedia', 'orderByFilter', 'smoothScroll'];

    static componentName = 'CourseController';

    course: ICourse;
    order: IOrder;
    newModel: IModel;
    newComment: any;
    socialParams: any;
    showDetails: boolean;
    markerReadySEO: string;
    seoJson: any;
    breadcrumbList: any;


    constructor(private $log: ng.ILogService, $routeParams: IRouteParams,
                private $location: ng.ILocationService, private CourseResource: ICourseResource,
                private OrderResource: IOrderResource, private mediaObserver: IMediaObserverFactory,
                private mdDialog: ng.material.IDialogService, private Upload: ng.angularFileUpload.IUploadService,
                private $timeout: ng.ITimeoutService, private ModelResource: IModelResource,
                private constants: IConstants,
                private $rootScope: IRootScope, private $templateCache: ng.ITemplateCacheService,
                private $mdMedia: ng.material.IMedia, private orderByFilter: ng.IFilterOrderBy,
                private smoothScroll) {


        this.course = CourseResource.get({id: $routeParams.id});
        this.course.$promise.then((course) => {
            this.scrollToMain();
            this.setSocialParams(course);
            this.course.seoJson = this.createSeoJson(course);

            this.course.hearFormsPhotos = this.orderByFilter(course.hearFormsPhotos, "order");
            this.course.historyPhotos = this.orderByFilter(course.historyPhotos, "order");
            document.title = "Навчальний курс " + course.name + " " + "Львів";
            this.$rootScope.seo.description = "Ціна курсу:" + course.price + "грн. ";
            this.$rootScope.seo.description = course.description;
            this.markerReadySEO = "dynamic-content";

        }).catch((err) => {
            this.$log.error(err);
            this.$location.path(`/academy`);
        });

        this.order = new OrderResource();

        this.newComment = this.getBlankComment();

        this.newModel = this.getBlankModel();

    }

    createSeoJson(course) {
        return [
        {
            "@context": "http://schema.org",
            "@type": "Course",
            "name": course.name,
            "description": course.description,
            "provider": {
                "@type": "Organization",
                "name": "Palamar Group Academy",
                "sameAs": [
                    "https://www.facebook.com/hashtag/palamar_group",
                    "https://www.instagram.com/palamar_group/",
                    "https://vk.com/id202584528"
                ],
                "location": {
                    "name": "Palamar Group Academy",
                    "@type": "PostalAddress",
                    "streetAddress": "вул.Щирецька 36",
                    "addressLocality": "Львів",
                    "addressRegion": "ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ",
                    "addressCountry": "Україна"
                },
            },
            "previewUrl": "http://palamar.com.ua/academy/course/" + course._id,
            "image": "http://palamar.com.ua" + course.avatar,
            "creator": {
                "@context": "http://schema.org/",
                "@type": "Person",
                "name": course.author.name
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "UAH",
                "price": course.price,
                "seller": {
                    "@type": "Organization",
                    "name": "Palamar Group Academy",
                    "sameAs": "http://palamar.com.ua/academy",
                }
            }

        },{
            "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@id": "http://palamar.com.ua/academy",
                    "name": "Академія",
                    "image": "http://palamar.com.ua/content/images/bg/courses/dates/IMG_7095_1539_1026.jpg"
                }
            }, {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@id": "http://palamar.com.ua/academy/course/" + course._id,
                    "name": course.name,
                    "image": "http://palamar.com.ua" + course.avatar
                }
            }]
        }]
    }


    scrollToMain() {
        var options = {
            duration: 100,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    getPictureFlex(index, length) {
        if (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 )) {
            return 46;
        } else {
            return 22;
        }
    }

    setSocialParams(course: ICourse) {
        this.$rootScope.socialParams.host = this.constants.host;
        this.$rootScope.socialParams.target = this.constants.host + "/academy/course/" + course._id;
        this.$rootScope.socialParams.image = this.constants.host + course.avatar;
        this.$rootScope.socialParams.title = 'Запрошуємо на ' + course.name;
        this.$rootScope.socialParams.description = course.description;

        this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
    }

    showComments(): Boolean {
        if (this.course.comments) {
            return this.course.comments.some(function (value, index, _ary) {
                return value.isVisible;
            });
        } else {
            return false;
        }

    }

    showModelDialog($event): void {
        this.newModel = this.getBlankModel();

        this.mdDialog.show({
            template: this.$templateCache.get("app/courses/views/model.form.html").toString(),
            bindToController: true,
            controller: CourseController.componentName,
            controllerAs: 'vm',
            parent: angular.element(document.querySelector('#mainContent')),
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
        });
    }


    saveModelPhoto(file, photoName): void {
        if (!file) return;

        this.$rootScope.loading = true;
        this.fileUpload(file).then((response) => {
            this.newModel[photoName] = response.data.url;
        }).catch((err) => {
            this.$log.debug("fail upload file..." + err);
        }) .finally(() => {
            this.$rootScope.loading = false;
        });
    }

    fileUpload(file) {
        return this.Upload.upload<{url: string}>({
            method: 'POST',
            url: this.constants.photoUrl,
            data: {file: file}
        });
    }


    submitModel(): void {
        if (this.newModel.name || this.newModel.email || this.newModel.comment || this.newModel.phone) {
            this.$rootScope.loading = true;
            this.newModel.$save()
                .then(() => {
                    this.mdDialog.hide();
                    this.showModelConfirm();
                })
                .catch((err) => {
                        this.$log.error(err);
                    }
                ).finally(() => {
                this.$rootScope.loading = false;
            });
        }
    }


    scrollToName() {
        var options = {
            duration: 50,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('modelName');
        this.smoothScroll(element, options);
    }

    showModelConfirm(): void {

        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу заявку стати моделлю прийнято. ')
                .textContent('На протязі дня з вами зв`яжеться координатор акодемії. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято.j ')
                .ok('Закрити')
        );

    }

    showOrderDialog($event): void {

        this.mdDialog.show({
            template: this.$templateCache.get("app/courses/views/order.html").toString(),
            bindToController: true,
            controller: CourseController.componentName,
            controllerAs: 'vm',
            parent: angular.element(document.querySelector('#mainContent')),
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
        });

    }

    showOrderConfirm(): void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Вашу заявку прийнято. ')
                .textContent('На протязі дня з вами зв`яжеться координатор акодемії. Дякуємо.')
                .ariaLabel('Вашу заявку прийнято. ')
                .ok('Закрити')
        );

    }

    submitOrder(form): void {
        if (this.order.name || this.order.comment || this.order.phone) {

            this.$rootScope.loading = true;
            this.order.event_id = this.course._id;
            this.order.event_name = this.course.name;

            this.order.event_dates = this.course.days.map((day) => day.date);
            this.order.date = new Date().toJSON();
            this.order.$save()
                .then(() => {
                    this.mdDialog.hide();
                    this.showOrderConfirm();
                })
                .catch((err) => {
                    this.$log.error(err);
                })
                .finally(() => {
                    this.order = new this.OrderResource();
                    this.$rootScope.loading = false;
                });
        } else {
            this.$location.hash("orderName");
        }
    }

    cancel(): void {
        this.mdDialog.hide();
    }

    showCommentDialog($event): void {
        this.mdDialog.show({
            template: this.$templateCache.get("app/courses/views/comment.form.html").toString(),
            bindToController: true,
            controller: CourseController.componentName,
            controllerAs: 'vm',
            parent: angular.element(document.body),
            fullscreen: this.$mdMedia('(max-width: 1360px)')
        });

    }

    submitComment(form): void {
        if (form.$valid) {

            this.$rootScope.loading = true;
            this.newComment.date = new Date();
            this.CourseResource.addComment({id: this.course._id}, this.newComment).$promise.then(() => {
                this.mdDialog.hide();
                this.showCommentConfirm();
            })
                .catch((err) => {
                        this.$log.error(err);
                    }
                ).finally(() => {
                this.$timeout(() => {
                    this.$rootScope.loading = false;
                    this.newComment = this.getBlankComment();
                });
            });

        }
    }

    showCommentConfirm(): void {
        this.mdDialog.show(
            this.mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Дякуємо за відгук.')
                .textContent('Ваш відгук з`явиться на сайті після модерації.')
                .ariaLabel('Дякуємо за відгук.')
                .ok('Закрити')
        );

    }


    showMediaObserver(items, index): void {
        this.mediaObserver.observe(items, index, this.socialParams);
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
        return new this.ModelResource({
            fasPhotoUrl: '../content/images/models/fas.jpg',
            profilePhotoUrl: '../content/images/models/prifile.jpg',
            backPhotoUrl: '../content/images/models/back.jpg',
            fullSizePhotoUrl: '../content/images/models/fullsize.jpg'
        });
    }

}