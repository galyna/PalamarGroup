
/**
 * Created by Galyna on 11.05.2016.
 */


export class LeftMenuController {

    static $inject = ['$location','$route'];
    static componentName = 'LeftMenuController';


    constructor(private $location:ng.ILocationService,private $route) {
 
    }

    navToCources():void {
        this.$location.url('/admin/academy/courses');
        this.$route.reload();
    }
    navToOrders():void {
        this.$location.url('/admin/academy/orders');
        this.$route.reload();
    }
}
