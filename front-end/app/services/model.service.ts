/**
 * Created by Galyna on 14.05.2016.
 */

import {IConstants} from "../app.config";
import IModel = pg.models.IModel;

//noinspection ReservedWordAsName
export interface IModelService {
    get(): ng.IPromise<IModel[]>;
    get(id: string): ng.IPromise<IModel>;
    delete(id: string): ng.IPromise<void>;
    post(model: any): ng.IPromise<IModel>;
    put(id:string,model: any): ng.IPromise<IModel>;
}

export class ModelService implements IModelService {
    static $inject = ['$http', 'constants'];
    static componentName = 'modelService';
    private url:string;

    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = constants.apiUrl + '/model';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<IModel | IModel[]>(getUrl).then((res) => {
            return res.data;
        });
    };


    post(model) {
        return this.$http.post<IModel>(this.url, model).then(function (res) {
            return res.data;
        });
    };

    put(id:string,model) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<IModel>(getUrl, model).then(function (res) {
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

