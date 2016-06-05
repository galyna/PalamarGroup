/**
 * Created by Galyna on 08.04.2016.
 */

//modules
import 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-animate';
import 'ng-file-upload';
import {coreModule} from "../core/core.module";
import {resourcesModule} from "../resources/resources.module";

//components
import {adminRoutes} from './admin.routes';
import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyCommentController} from './academy/controllers/comments.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminController} from './controllers/admin.controller';
import {LeftMenuController} from './academy/controllers/left.menu.controller';
import {DeliveryService} from "./academy/services/delivery.service";
import {EmailAdvComponentName, EmailAdvComponentOptions} from "./academy/components/email.adv.component";
import {
    SalonClientFormComponentName,
    SalonClientFormComponentOptions
} from "./academy/components/salon.client.form.component";


let app = angular.module('admin', [
    'ngRoute',
    'ngMaterial',
    'ngFileUpload',
    'ngImgCrop',
    coreModule.name,
    resourcesModule.name
])
    .config(adminRoutes)
    .controller(AdminController.componentName, AdminController)
    .controller(AcademyCoursesController.componentName, AcademyCoursesController)
    .controller(AcademyOrdersController.componentName, AcademyOrdersController)
    .controller(AcademyModelController.componentName, AcademyModelController)
    .controller(AcademyDeliveryController.componentName, AcademyDeliveryController)
    .controller(AcademyCommentController.componentName, AcademyCommentController)
    .controller(AcademyContactsController.componentName, AcademyContactsController)
    .controller(LeftMenuController.componentName, LeftMenuController)
    .service(DeliveryService.componentName, DeliveryService)
    .component(EmailAdvComponentName, EmailAdvComponentOptions)
    .component(SalonClientFormComponentName, SalonClientFormComponentOptions);

export let adminModule = app;
