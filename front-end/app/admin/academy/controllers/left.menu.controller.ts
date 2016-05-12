
/**
 * Created by Galyna on 11.05.2016.
 */


export class LeftMenuController {

    static $inject = ['$location'];
    static componentName = 'LeftMenuController';


    constructor(private $location:ng.ILocationService) {
 
    }

    navToCources():void {
        this.$location.url('/admin/academy/courses');

    }
    navToOrders():void {
        this.$location.url('/admin/academy/orders');

    }
}
