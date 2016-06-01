import IOrder = pg.models.IOrder;
import {IConstants} from "../core/core.config";

export interface IOrderService {
    get(): ng.IPromise<IOrder[]>;
    get(id: string): ng.IPromise<IOrder>;
    post(order: any): ng.IHttpPromise<IOrder>;
    delete(id: string): ng.IPromise<void>;
    put(id:string,order: any): ng.IPromise<IOrder>;
}

export class OrderService implements IOrderService {

    static $inject = ['$http', 'constants'];
    static componentName = 'orderService';

    private url:string;

    constructor(private $http:ng.IHttpService, constants:IConstants) {
        this.url = constants.apiUrl + '/order';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<IOrder | IOrder[]>(getUrl).then((res) => {
            return res.data;
        });
    }

    post(order) {
        return this.$http.post<{data: IOrder}>(this.url, order).then(function (res) {
            return res.data;
        });
    }

    put(id:string,order) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<IOrder>(getUrl, order).then(function (res) {
            return res.data;
        });
    };

    //noinspection ReservedWordAsName
    delete(id:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.delete(getUrl).then(() => {

        });
    };


}

