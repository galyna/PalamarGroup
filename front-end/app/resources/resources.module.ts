//modules
import 'angular';
import 'angular-resource';
import {coreModule} from "../core/core.module";

//components
import {CourseResource, CourseResourceName} from "./course.resource";
import {OrderResource, OrderResourceName} from "./order.resource";
import {ModelResourceName, ModelResource} from "./model.resource";
import {ContactResourceName, ContactResource} from "./contact.resource";
import {CommentResourceName, CommentResource} from "./comment.resource";

export let resourcesModule = angular.module('resources', ['ngResource', coreModule.name])
    .factory(CourseResourceName, CourseResource)
    .factory(ModelResourceName, ModelResource)
    .factory(ContactResourceName, ContactResource)
    .factory(CommentResourceName, CommentResource)
    .factory(OrderResourceName, OrderResource);