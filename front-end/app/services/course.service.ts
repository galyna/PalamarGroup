/**
 * Created by Galyna on 08.04.2016.
 */

import {IConstants} from "../app.config";
import ICourse = pg.models.ICourse;

//noinspection ReservedWordAsName
export interface ICourseService {
    get(): ng.IPromise<ICourse[]>;
    get(id: string): ng.IPromise<ICourse>;
    delete(id: string): ng.IPromise<void>;
    post(course: any): ng.IPromise<ICourse>;
    put(id:string,course: any): ng.IPromise<ICourse>;
}

export class CourseService implements ICourseService {
    static $inject = ['$http', 'constants'];
    static componentName = 'courseService';
    private url:string;

    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = constants.apiUrl + '/course';
    }

    //TODO: implement filtering
    get(id?:string) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get<ICourse | ICourse[]>(getUrl).then((res) => {
            return res.data;
        });
    };


    post(course) {
        return this.$http.post<ICourse>(this.url, course).then(function (res) {
            return res.data;
        });
    };

    put(id:string,course) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.put<ICourse>(getUrl, course).then(function (res) {
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

