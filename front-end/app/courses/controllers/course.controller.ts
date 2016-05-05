import {ICourseService} from "../services/course.service";
import ICourse = pg.models.ICourse;

interface IRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', 'courseService', 'orderService', 'mediaObserver'];
    static componentName = 'CourseController';
    
    course: ICourse;
    order: any;
    formVisible: boolean;
    
    constructor(private $log:ng.ILogService, $routeParams: IRouteParams,
                private $location: ng.ILocationService, courseService:ICourseService, 
                private orderService, private mediaObserver) {
        
        courseService.get($routeParams.id).then((course) => {
            this.course = course;
            this.order = {
                name: '',
                email: '',
                phone: ''
            };
        }).catch(function (err) {
            $log.error(err);
        });
    }

    backToHome(): void {
        this.$location.url('/home');
    }

    submitOrder(): void {
        this.order.hideForm();
        if (this.order.model.email || this.order.model.phone) {
            this.order.model.event = this.course._id;
            this.orderService.post(this.order.model)
                .then(() => {
                    this.hideForm();
                })
                .catch((err) => {
                    this.$log.error(err);
                });
        }
    }

    showForm(): void {
        this.formVisible = true;
    }

    hideForm(): void {
        this.formVisible = false;
    };

    showMediaObserver(): void {
        this.mediaObserver.observe();
    }
}