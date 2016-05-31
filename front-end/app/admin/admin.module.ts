/**
 * Created by Galyna on 08.04.2016.
 */

import 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-animate';
import 'ng-file-upload';

import {coursesRoutes} from './admin.routes';
import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyCommentController} from './academy/controllers/comments.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminController} from './controllers/admin.controller';
import {LeftMenuController} from './academy/controllers/left.menu.controller';
import {CourseService} from "../services/course.service";
import {OrderService} from "../services/order.service";
import {CommentService} from "../services/comment.service";
import {ModelService} from "../services/model.service";
import {SalonClientService} from "./academy/services/salon.client.service";
import {DeliveryService} from "./academy/services/delivery.service";
import {ContactService} from "../services/contact.service";
import {AcademyCourseController} from "./academy/controllers/course.controller";

let app = angular.module('admin', [
    'ngRoute',
    'ngMaterial',
    'ngFileUpload'
])
    .config(coursesRoutes)
    .controller(AdminController.componentName, AdminController)
    .controller(AcademyCoursesController.componentName, AcademyCoursesController)
    .controller(AcademyOrdersController.componentName, AcademyOrdersController)
    .controller(AcademyModelController.componentName, AcademyModelController)
    .controller(AcademyDeliveryController.componentName, AcademyDeliveryController)
    .controller(AcademyCommentController.componentName, AcademyCommentController)
    .controller(AcademyContactsController.componentName, AcademyContactsController)
    .controller(LeftMenuController.componentName, LeftMenuController)
    .service(CourseService.componentName, CourseService)
    .service(OrderService.componentName, OrderService)
    .service(ModelService.componentName, ModelService)
    .service(CommentService.componentName, CommentService)
    .service(ContactService.componentName, ContactService)
    .service(SalonClientService.componentName, SalonClientService)
    .service(DeliveryService.componentName, DeliveryService);

export let adminModule = app;
