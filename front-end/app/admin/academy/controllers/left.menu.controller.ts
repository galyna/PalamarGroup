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

    navToModels():void {
        this.$location.url('/admin/academy/models');
        this.$route.reload();
    }

    navToDelivery():void {
        this.$location.url('/admin/academy/delivery');
        this.$route.reload();
    }

    navToContacts():void {
        this.$location.url('/admin/academy/contacts');
        this.$route.reload();
    }


    navToComments():void {
        this.$location.url('/admin/academy/comments');
        this.$route.reload();
    }
}
