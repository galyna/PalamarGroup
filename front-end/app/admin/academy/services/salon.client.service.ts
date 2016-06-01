/**
 * Created by Galyna on 14.05.2016.
 */
/**
 * Created by Galyna on 14.05.2016.
 */

import ISalonClient = pg.models.ISalonClient;
import {IConstants} from "../../../core/core.config";

//noinspection ReservedWordAsName
export interface ISalonClientService {
    get(): ng.IPromise<ISalonClient[]>;
    get(id: string): ng.IPromise<ISalonClient>;
    delete(id: string): ng.IPromise<void>;
    post(model: any): ng.IPromise<ISalonClient>;
    put(id:string,model: any): ng.IPromise<ISalonClient>;
}

export class SalonClientService implements ISalonClientService {
    static $inject = ['$http', 'constants'];
    static componentName = 'salonClientService';
    private url:string;

    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = constants.apiUrl + '/salon-client';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<ISalonClient | ISalonClient[]>(getUrl).then((res) => {
            return res.data;
        });
    };


    post(model) {
        return this.$http.post<ISalonClient>(this.url, model).then(function (res) {
            return res.data;
        });
    };

    put(id:string,model) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<ISalonClient>(getUrl, model).then(function (res) {
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

