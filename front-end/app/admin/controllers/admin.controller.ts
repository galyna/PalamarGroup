/**
 * Created by Galyna on 08.04.2016.
 */
    
export class AdminController {

    static $inject = ['$location'];
    static componentName = 'AdminController';
    
    constructor(private $location:ng.ILocationService) {

    }
    navToAcademy():void {
        this.$location.url('/admin/academy');
    }
    navToSalon():void {
        this.$location.url('/admin/salon');
    }
}



