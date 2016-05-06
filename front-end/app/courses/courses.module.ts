/**
 * Created by Galyna on 13.04.2016.
 */
import {coursesRoutes} from './courses.routes';
import {CoursesController} from './controllers/courses.controller';
import {CourseService} from "../services/course.service";
import {CourseController} from "./controllers/course.controller";
import {OrderService} from "../services/order.service";

let app = angular.module('courses', [ 'ngMaterial'])
    .config(coursesRoutes)
    .controller(CoursesController.componentName, CoursesController)
    .controller(CourseController.componentName, CourseController)
    .service(CourseService.componentName, CourseService)
    .service(OrderService.componentName, OrderService);

export let coursesModule = app;
