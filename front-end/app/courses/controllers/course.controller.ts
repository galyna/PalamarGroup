import {ICourseService} from "../../services/course.service";
import ICourse = pg.models.ICourse;
import IOrder = pg.models.IOrder;

interface IRouteParams extends ng.route.IRouteParamsService {
    id:string;
}

export class CourseController {

    static $inject = ['$log', '$routeParams', '$location', 'courseService', 'orderService', 'mediaObserver'];
    static componentName = 'CourseController';

    course:ICourse;
    order:IOrder;
    formVisible:boolean;

    constructor(private $log:ng.ILogService, $routeParams:IRouteParams,
                private $location:ng.ILocationService, courseService:ICourseService,
                private orderService:ICourseService, private mediaObserver) {

        courseService.get($routeParams.id).then((course) => {
            this.course = course;
        }).catch(function (err) {
            $log.error(err);
        });
    }

    backToHome():void {
        this.$location.url('/home');
    }

    submitOrder():void {
        this.hideForm();
        if (this.order.email || this.order.phone || this.order.name) {
            this.order.event_id = this.course._id;
            this.order.event_dates = this.course.courseModulesDates;
            this.order.event_name = this.course.name;
            this.order.date = new Date().toJSON();
            this.orderService.post(this.order)
                .then(() => {
                    this.hideForm();
                })
                .catch((err) => {
                    this.$log.error(err);
                });
        }
    }

    showForm():void {
        this.formVisible = true;
    }

    hideForm():void {
        this.formVisible = false;
    };

    showMediaObserver():void {
        this.mediaObserver.observe();
    }
}