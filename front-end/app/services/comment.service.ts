/**
 * Created by Galyna on 14.05.2016.
 */
import {IConstants} from "../app.config";
import IComment = pg.models.IComment;

export interface ICommentService {
    get(): ng.IPromise<IComment[]>;
    get(id: string): ng.IPromise<IComment>;
    post(comment: any): ng.IHttpPromise<IComment>;
    delete(id: string): ng.IPromise<void>;
    put(id:string,comment: any): ng.IPromise<IComment>;
}

export class CommentService implements ICommentService {

    static $inject = ['$http', 'constants'];
    static componentName = 'commentService';

    private url:string;

    constructor(private $http:ng.IHttpService, constants:IConstants) {
        this.url = constants.apiUrl + '/comment';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<IComment | IComment[]>(getUrl).then((res) => {
            return res.data;
        });
    }

    post(comment) {
        return this.$http.post<{data: IComment}>(this.url, comment).then(function (res) {
            return res.data;
        });
    }

    put(id:string,comment) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<IComment>(getUrl, comment).then(function (res) {
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


