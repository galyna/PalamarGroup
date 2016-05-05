import {IConstants} from "../../app.config";
/**
 * Created by Galyna on 08.04.2016.
 */

export interface ICourseService {
    get(id: string): ng.IPromise<any>;
}

export class CourseService implements ICourseService {
    static $inject = ['$http', 'constants'];
    static componentName = 'courseService';
    private url:string;

    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = constants.apiUrl + '/course';
    }

    //TODO: implement filtering
    get(id) {
        var getUrl = id ? this.url + '/' + id : this.url;
        return this.$http.get(getUrl).then((res) => {
            return res.data;
        });
    };
}

