import {IOrderService} from "../services/order.service";
import IOrder = pg.models.IOrder;

export class AcademyOrdersController {

    static $inject = ['orderService', '$location'];
    static componentName = 'AcademyOrdersController';

    orders:IOrder[];

    constructor(private orderService:IOrderService, private $location:ng.ILocationService) {
        this.orderService.get().then((orders) => {
            this.orders = orders;
        })
    }

    deleteOrder(item:IOrder):void {
        this.orderService.delete(item._id).then(()=> {
            this.orders.splice(this.orders.indexOf(item), 1);
        });
    }

        answerOrder(item:IOrder):void {
            item.answered=true;
            this.orderService.put( item._id, item).then(()=> {
                this.orders.splice(this.orders.indexOf(item), 1, item);
            });
        }

}