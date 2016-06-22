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
import 'ng-img-crop-full-extended';
import {coreModule} from "../core/core.module";
import {resourcesModule} from "../resources/resources.module";
import '../templates';

//components
import {adminRoutes} from './admin.routes';
import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {AcademyCommentController} from './academy/controllers/comments.controller';
import {AcademyContactsController} from './academy/controllers/contacts.controller';
import {AdminController} from './controllers/admin.controller';
import {DeliveryService} from "./academy/services/delivery.service";
import {EmailAdvComponentName, EmailAdvComponentOptions} from "./academy/components/email.adv.component";
import {
    SalonClientFormComponentName,
    SalonClientFormComponentOptions
} from "./academy/components/salon.client.form.component";
import {AdminOrdersComponentName, AdminOrdersComponentOptions} from "./academy/components/orders.component";
import {uiModule} from "../ui/ui.module";
import {AdminCoursesComponentName, AdminCoursesComponentOptions} from "./academy/components/courses.component";
import {AdminCourseComponentName, AdminCourseComponentOptions} from "./academy/components/course.component";
import {HeaderComponentName, HeaderComponentOptions} from "./components/header.component";
import {LeftSidenavComponentName, LeftSidenavComponentOptions} from "./components/left.sidenav.component";
import {testComponentName, testComponentOptions} from "./components/test.component";


let app = angular.module('admin', [
    'ngRoute',
    'ngMaterial',
    'ngFileUpload',
    'ngImgCrop',

    'templates',
    coreModule.name,
    resourcesModule.name,
    uiModule.name
])
    .config(adminRoutes)
    .controller(AdminController.componentName, AdminController)
    .controller(AcademyOrdersController.componentName, AcademyOrdersController)
    .controller(AcademyModelController.componentName, AcademyModelController)
    .controller(AcademyDeliveryController.componentName, AcademyDeliveryController)
    .controller(AcademyCommentController.componentName, AcademyCommentController)
    .controller(AcademyContactsController.componentName, AcademyContactsController)
    .service(DeliveryService.componentName, DeliveryService)
    .component(HeaderComponentName, HeaderComponentOptions)
    .component(LeftSidenavComponentName, LeftSidenavComponentOptions)
    .component(AdminCoursesComponentName, AdminCoursesComponentOptions)
    .component(AdminCourseComponentName, AdminCourseComponentOptions)
    .component(EmailAdvComponentName, EmailAdvComponentOptions)
    .component(AdminOrdersComponentName, AdminOrdersComponentOptions)
    .component(SalonClientFormComponentName, SalonClientFormComponentOptions)
    .component(testComponentName, testComponentOptions);

export let adminModule = app;
