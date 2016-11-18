//modules
import 'angular';
import 'angular-resource';
import {coreModule} from "../core/core.module";

//components
import {CourseResource, CourseResourceName} from "./course.resource";
import {OrderResource, OrderResourceName} from "./order.resource";
import {ModelResourceName, ModelResource} from "./model.resource";
import {ContactResourceName, ContactResource} from "./contact.resource";
import {SalonClientResourceName, SalonClientResource} from "./salon.client.resource";
import {EmailService} from "./email.service";
import {PhotoServiceName, PhotoService} from "./photo.service";
import {UserResourceName, UserResource} from "./user.resource";
import {MasterResourceName, MasterResource} from "./master.resource";
import {FavorResourceName, FavorResource} from "./favor.resource";
import {TransformResourceName, TransformResource} from "./transform.resource";
import {AppointmentResourceName, AppointmentResource} from "./appointment.resource";
import {BrendResourceName, BrendResource} from "./brend.resource";
import {ProductResourceName, ProductResource} from "./product.resource";
import {ProductOrderResource, ProductOrderResourceName} from "./product.order.resource";
import {SalonResource, SalonResourceName} from "./salon.resource";
import {AcademyVideosResource, AcademyVideosResourceName} from "./academy.video.resource";
import {SeoPageResourceName, SeoPageResource} from "./seo.page.resource";

export let resourcesModule = angular.module('resources', ['ngResource', coreModule.name])
    .factory(CourseResourceName, CourseResource)
    .factory(ModelResourceName, ModelResource)
    .factory(ContactResourceName, ContactResource)
    .factory(SalonClientResourceName, SalonClientResource)
    .factory(MasterResourceName, MasterResource)
    .factory(OrderResourceName, OrderResource)
    .service(UserResourceName, UserResource)
    .service(FavorResourceName, FavorResource)
    .service(TransformResourceName, TransformResource)
    .service(AppointmentResourceName, AppointmentResource)
    .service(BrendResourceName, BrendResource)
    .service(ProductResourceName, ProductResource)
    .service(SalonResourceName, SalonResource)
    .service(ProductOrderResourceName, ProductOrderResource)
    .service(AcademyVideosResourceName, AcademyVideosResource)
    .service(SeoPageResourceName, SeoPageResource)
    .service(EmailService.componentName, EmailService)
    .service(PhotoServiceName, PhotoService);