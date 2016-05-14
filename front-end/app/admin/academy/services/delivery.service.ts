/**
 * Created by Galyna on 14.05.2016.
 */

import {IConstants} from "../app.config";
import ISalonClient = pg.models.ISalonClient;

//noinspection ReservedWordAsName
export interface IDeliveryService {
    post(model: any): void;
}

export class DeliveryService implements IDeliveryService {
    static $inject = ['$http', 'constants'];
    static componentName = 'deliveryService';
    private url:string;

    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = constants.apiUrl + '/salon-client';
    }

    post(model) {
        return this.$http.post<ISalonClient>(this.url, model).then(function (res) {
            return res.data;
        });
    };



}

