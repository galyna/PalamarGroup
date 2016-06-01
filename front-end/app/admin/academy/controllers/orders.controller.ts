import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";

export class AcademyOrdersController {

    static $inject = [OrderResourceName, '$location'];
    static componentName = 'AcademyOrdersController';

    orders: IOrder[];

    constructor(private OrderResource: IOrderResource, private $location:ng.ILocationService) {
        this.orders = this.OrderResource.query();
    }

    deleteOrder(order: IOrder) {
        order.$delete().then(()=> {
            this.orders.splice(this.orders.indexOf(order), 1);
        });
    }

    answerOrder(order: IOrder) {
        order.answered=true;
        order.$save();
    }

}