import {IConstants} from "../app.config";
import IOrder = pg.models.IOrder;

export interface IOrderService {
    get(id: string): ng.IHttpPromise<IOrder>;
    post(order: any): ng.IHttpPromise<IOrder>;
}

export class OrderService implements IOrderService {

    static $inject = ['$http', 'constants'];
    static componentName = 'orderService';

    private url:string;

    constructor(private $http:ng.IHttpService, constants:IConstants) {
        this.url = constants.apiUrl + '/order';
    }

    //TODO: implement filtering
    get(id:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<{data: IOrder}>(getUrl).then((res) => {
            return res.data;
        });
    }

    post(order) {
        return this.$http.post<{data: IOrder}>(this.url, order).then(function (res) {
            return res.data;
        });
    }

}

