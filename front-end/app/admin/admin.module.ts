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
import 'angular-youtube-embed';
import 'daypilot-common';
import 'daypilot-calendar';
import 'daypilot-navigator';

import {coreModule} from "../core/core.module";
import {resourcesModule} from "../resources/resources.module";
import {salonModule} from "./salon/salon.module";
import {uiModule} from "../ui/ui.module";
import '../templates';
import {adminRoutes} from './admin.routes';
import {adminRun} from "./admin.run";
import {usersModule} from "../users/users.module";


//components
import {AcademyModelController} from './academy/controllers/models.controller';
import {AcademyDeliveryController} from './academy/controllers/delivery.controller';
import {DeliveryService} from "./academy/services/delivery.service";
import {EmailAdvComponentName, EmailAdvComponentOptions} from "./academy/components/email.adv.component";
import {
SalonClientFormComponentName,
SalonClientFormComponentOptions
} from "./academy/components/salon.client.form.component";
import {AdminOrdersComponentName, AdminOrdersComponentOptions} from "./academy/components/orders.component";
import {AdminCoursesComponentName, AdminCoursesComponentOptions} from "./academy/components/courses.component";
import {AdminCourseComponentName, AdminCourseComponentOptions} from "./academy/components/course.component";
import {HeaderComponentName, HeaderComponentOptions} from "./components/header.component";
import {LeftSidenavComponentName, LeftSidenavComponentOptions} from "./components/left.sidenav.component";
import {usersComponentName, usersComponentOptions} from "./components/users.component";
import {userComponentName, userComponentOptions} from "./components/user.component";
import {CommentsComponentName, CommentsComponentOptions} from "./academy/components/comments.component";
import {ContactsComponentName, ContactsComponentOptions} from "./academy/components/contacts.component";
import {ContactComponentName, ContactComponentOptions} from "./academy/components/contact.component";

let app = angular.module('admin', [
    'ngRoute',
    'ngMaterial',
    'ngFileUpload',
    'ngImgCrop',
    'youtube-embed',
    'templates',
    'daypilot',

    coreModule.name,
    resourcesModule.name,
    uiModule.name,
    usersModule.name,
    salonModule.name
])
    .config(adminRoutes)
    .run(adminRun)

    .controller(AcademyModelController.componentName, AcademyModelController)
    .controller(AcademyDeliveryController.componentName, AcademyDeliveryController)
    .service(DeliveryService.componentName, DeliveryService)
    .component(HeaderComponentName, HeaderComponentOptions)
    .component(LeftSidenavComponentName, LeftSidenavComponentOptions)
    .component(AdminCoursesComponentName, AdminCoursesComponentOptions)
    .component(AdminCourseComponentName, AdminCourseComponentOptions)
    .component(EmailAdvComponentName, EmailAdvComponentOptions)
    .component(AdminOrdersComponentName, AdminOrdersComponentOptions)
    .component(SalonClientFormComponentName, SalonClientFormComponentOptions)
    .component(usersComponentName, usersComponentOptions)
    .component(userComponentName, userComponentOptions)
    .component(CommentsComponentName, CommentsComponentOptions)
    .component(ContactsComponentName, ContactsComponentOptions)
    .component(ContactComponentName, ContactComponentOptions);


export let adminModule = app;
