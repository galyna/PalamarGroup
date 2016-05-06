/**
 * Created by Galyna on 08.04.2016.
 */

import {coursesRoutes} from './admin.routes';
import {OrderController} from './controllers/order.controller';
import {AdminController} from './controllers/admin.controller';
import {CourseService} from "../services/course.service";
import {OrderService} from "../services/order.service";

let app = angular.module('admin', [ 'ngMaterial'])
    .config(coursesRoutes)
    .controller(AdminController.componentName, AdminController)
    .controller(OrderController.componentName, OrderController)
    .service(CourseService.componentName, CourseService)
    .service(OrderService.componentName, OrderService);

export let adminModule = app;
