import 'angular';
import 'angular-resource';
import {CourseResource, CourseResourceName} from "./course.resource";
import {coreModule} from "../core/core.module";

export let resourcesModule = angular.module('resources', ['ngResource', coreModule.name])
    .factory(CourseResourceName, CourseResource);