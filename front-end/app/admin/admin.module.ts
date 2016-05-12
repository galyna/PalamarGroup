/**
 * Created by Galyna on 08.04.2016.
 */

import {coursesRoutes} from './admin.routes';
import {AcademyOrdersController} from './academy/controllers/orders.controller';
import {AcademyCoursesController} from './academy/controllers/courses.controller';
import {AdminController} from './controllers/admin.controller';
import {LeftMenuController} from './academy/controllers/left.menu.controller';
import {CourseService} from "../services/course.service";
import {OrderService} from "../services/order.service";

let app = angular.module('admin', [ 'ngMaterial'])
    .config(coursesRoutes)
    .controller(AdminController.componentName, AdminController)
    .controller(AcademyCoursesController.componentName, AcademyCoursesController)
    .controller(AcademyOrdersController.componentName, AcademyOrdersController)
    .controller(LeftMenuController.componentName, LeftMenuController)
    .service(CourseService.componentName, CourseService)
    .service(OrderService.componentName, OrderService);

export let adminModule = app;
