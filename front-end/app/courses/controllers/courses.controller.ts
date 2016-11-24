import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import {IRootScope} from "../../../typings";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";
/**
 * Created by Galyna on 13.04.2016.
 */

export interface ICourseDates {
    date: string;
    coursesId: any;
}

export class CoursesController {

    static $inject = ['$scope', '$sce', '$location', '$rootScope',
        'pgCalendarData', CourseResourceName, '$mdMedia', 'orderByFilter', 'smoothScroll', SeoPageResourceName, "$q"];
    static componentName = 'CoursesController';
    courses: ICourse[];
    calendarDirection = 'horizontal';
    showAnimation: boolean;
    markerReadySEO: string;
    seo: any;
    seoJson: any;


    constructor($scope, private $sce, private $location, private $rootScope: IRootScope,
                private pgCalendarData: IPgCalendarDataService,
                private CourseResource: ICourseResource, private $mdMedia,
                private orderByFilter: ng.IFilterOrderBy, private smoothScroll,
                private SeoPageResource: ISeoPageResource, private $q) {

        this.showAnimation = $rootScope.isBigSize;

        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        })
        this.initSeo();
        this.getCourses();
    }

    getCourses() {
        this.seo = this.SeoPageResource.query({query: {"name": "academy"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
                this.seoJson.description = seo[0].description ? seo[0].description : this.seoJson.description;
            }

        });
        this.courses = this.CourseResource.query({sort: "order"});
        this.courses.$promise.then((courses) => {
            courses.forEach((course)=> {
                course.seoJson = this.createSeoJson(course);
            })
            this.scrollToMain();
        });
        this.$q.all([this.courses.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }

    createSeoJson(course) {
        return {
            "@context": "http://www.schema.org",
            "@type": "EducationEvent",
            "name": course.name,
            "url": "http://www.palamar.com.ua/academy/course/" + course._id,
            "recordedIn": {
                "@type": "CreativeWork",
                "about": course.name,
                "author": {
                    "@type": "Person",
                    "name": course.author.name
                }
            },
            "image":"http://www.palamar.com.ua"+ course.avatar,
            "description": course.description,
            "funder": {
                "@type": "Organization",
                "name": "Palamar Group Academy"
            },
            'composer': {
                "@type": "Person",
                "name": course.author.name
            },

            "location": {
                "name":"Palamar Group Academy",
                "@type": "PostalAddress",
                "streetAddress": "вул.Щирецька 36",
                "addressLocality": "Львів",
                "addressRegion": "ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ",
                "addressCountry": "Україна"
            },
            "startDate":course.isVisible && course.days.length >0  ?  course.days[0].date:"",
            "endDate": course.isVisible && course.days.length > 0  ? course.days[course.days.length - 1].date : ""

        }
    }

    initSeo() {
        this.seoJson = {
            "@context": "http://www.schema.org",
            "@type": "EducationalOrganization",
            "name": "Palamar Group Academy",
            "url": "http://www.palamar.com.ua/academy",
            "founder": {
                "@type": "Person",
                "name": "YULIA PALAMAR"
            },
            "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
            "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
            "description": "Навчання для працівників солонів краси, Теми: чоловічі та жіночі стрижки, fassion-style, колористика ",
            "serviceArea": {
                "@type": "AdministrativeArea",
                "name": "Львів"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул.Щирецька 36",
                "addressLocality": "Львів",
                "addressRegion": "ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ",
                "addressCountry": "Україна"
            },

            "telephone": "+38 068 9898806"
        }
    }

    scrollToMain() {
        var options = {
            duration: 100,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    showDetails(id: string) {

        this.$location.url('/academy/course/' + id);
    }
}



