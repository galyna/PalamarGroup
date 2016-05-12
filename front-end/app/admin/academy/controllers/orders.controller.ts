import {IOrderService} from "../services/order.service";
import IOrder = pg.models.IOrder;

export class AcademyOrdersController {

    static $inject = ['orderService','$location'];
    static componentName = 'AcademyOrdersController';

    orders: IOrder[];

    constructor(private orderService:IOrderService, private $location:ng.ILocationService) {
        this.orderService.get().then((orders) => {
            this.orders = orders;
        })
    }
    deleteOrder():void {
        this.$location.url('/admin/academy');
    }

}