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

        })

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
        if(!course.isVisible){return;}
        return {

            "@context": "http://schema.org",
            "@type": "Course",
            "name": course.name,
            "description": course.description,
            "provider": {
                "@type": "Organization",
                "name": "Palamar Group Academy",
                "sameAs": [
                    "https://www.facebook.com/hashtag/palamar_group",
                    "https://www.instagram.com/palamar_group/"
                ],
                "location": {
                    "name":"Palamar Group Academy",
                    "@type": "PostalAddress",
                    "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                    "addressLocality": "Львів, Україна",
                    "addressCountry": "Україна"
                },
            },
            "previewUrl": "http://palamar.com.ua/academy/course/" + course._id,
            "image":"http://palamar.com.ua"+ course.avatar,
            "creator": {
                    "@type": "Person",
                    "name": course.author.name,
                "homeLocation":{
                    "@type": "Place",
                    "geo": {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": "49.8110769",
                            "longitude": "23.9737773"
                        },
                        "geoRadius": "50"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                        "addressLocality": "Львів, Україна",
                        "addressCountry": "Україна"
                    }
                }
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "UAH",
                "price": course.price,
                "seller": {
                    "@type": "Organization",
                    "name": "Palamar Group Academy",
                    "sameAs": [
                        "https://www.facebook.com/hashtag/palamar_group",
                        "https://www.instagram.com/palamar_group/",
                        "https://vk.com/id202584528"
                    ],
                }
            }

        }
    }



    scrollToMain() {
        var options = {
            duration: 1,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }


}



