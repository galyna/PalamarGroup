/**
 * Created by Galyna on 14.05.2016.
 */
import {IConstants} from "../app.config";
import IContact = pg.models.IContact;

export interface IContactService {
    get(): ng.IPromise<IContact[]>;
    get(id: string): ng.IPromise<IContact>;
    post(order: any): ng.IHttpPromise<IContact>;
    put(id:string,order: any): ng.IPromise<IContact>;
}

export class ContactService implements IContactService {

    static $inject = ['$http', 'constants'];
    static componentName = 'contactService';

    private url:string;

    constructor(private $http:ng.IHttpService, constants:IConstants) {
        this.url = constants.apiUrl + '/contact';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<IContact | IContact[]>(getUrl).then((res) => {
            return res.data;
        });
    }

    post(order) {
        return this.$http.post<{data: IContact}>(this.url, order).then(function (res) {
            return res.data;
        });
    }

    put(id:string,order) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<IContact>(getUrl, order).then(function (res) {
            return res.data;
        });
    };



}

