import {IConstants} from "../core/core.config";
export class EmailService {
    static $inject = ['$http', 'constants'];
    static componentName = 'emailService';
    
    private url: string;
    
    constructor(private $http: ng.IHttpService, constants: IConstants) {
        this.url = `${constants.apiUrl}/email`
    }
    
    sendAdv(courseId: string){
        return this.$http.post(`${this.url}/adv/${courseId}`, {})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    }
}