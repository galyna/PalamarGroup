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
    .service(EmailService.componentName, EmailService)
    .service(PhotoServiceName, PhotoService);