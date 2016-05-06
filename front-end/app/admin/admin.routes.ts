import {OrderController} from './controllers/order.controller';
import {AdminController} from './controllers/admin.controller';

coursesRoutes.$inject = ['$routeProvider'];
export function coursesRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/admin', {
            templateUrl: 'app/admin/views/admin.html',
            controller:AdminController.componentName,
            controllerAs: "vm"
        })
        .when('/admin/order', {
            templateUrl: 'app/admin/views/orders.html',
            controller: OrderController.componentName,
            controllerAs: "vm"
        });
}