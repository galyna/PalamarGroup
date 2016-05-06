import {IOrderService} from "../services/order.service";
import IOrder = pg.models.IOrder;

export class OrderController {

    static $inject = ['orderService'];
    static componentName = 'OrderController';

    orders: [IOrder];

    constructor(private orderService:IOrderService) {
        this.orderService.get().then((orders) => {
            this.orders = orders;
        })
    }


}