import {CourseResourceName, ICourseResource} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import ICourse = pg.models.ICourse;
import {IRootScope} from "../../../typings";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";


const template = ` 
 <script type='application/ld+json'>
{
            "@context": "http://www.schema.org",
            "@type": "EducationalOrganization",
            "name": "PALAMAR GROUP ACADEMY",
            "url": "http://www.palamar.com.ua/academy",
            "founder": {
                "@type": "Person",
                "name": "YULIA PALAMAR"
            },
            "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
            "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
            "description": "Навчання для працівників салонів краси, Теми: чоловічі та жіночі стрижки, fassion-style, колористика ",
            "areaServed": {
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
            "brand": {
                "@context": "http://schema.org/",
                "@type": "Brand",
                "url": "http:/palamar.com.ua/",
                "alternateName": "PALAMAR",
                "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
                "description": "Салон краси у Львуві. Послуги: стрижки, зачіски,фарбування, манікюр, візаж, мейкап, педікюр. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, манікюру, візажу, педікюру",
                "name": "PALAMAR GROUP"
            }
        } </script>
 <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers md-padding md-margin">
                <div class="md-display-1"> КАЛЕНДАР НАВЧАЛЬНИХ ЗАХОДІВ АКАДЕМІЇ</div>
            </div>

        </div>
    </div><div ng-attr-id="{{ $ctrl.markerReadySEO }}" layout="row" flex layout-align="center stretch"> <pg-calendar 
                             calendar-direction="$ctrl.calendarDirection"
                             on-prev-month="prevMonth"
                             on-next-month="nextMonth"
                             on-day-click="$ctrl.dayClick(date)"
                             title-format="'MMMM y'"
                             ng-model='selectedDate'
                             day-format="'d'"
                             day-label-format="'EEE'"
                             day-label-tooltip-format="'EEEE'"
                             day-tooltip-format="'fullDate'"
                             week-starts-on="firstDayOfWeek"
                             day-content="setDayContent"
                             template-url="'app/calendar/calendar.html'"></pg-calendar> </div>`;


export interface ICourseDates {
    date:Date;
    coursesId:any;
}


export class CalendarComponentController {

    static $inject = ['pgCalendarData','$rootScope', CourseResourceName, '$sce',
        '$location', 'orderByFilter', 'smoothScroll',
        SeoPageResourceName,"$q"];

    seo:any;
    courses:ICourse[];
    calendarDirection = 'horizontal';
    coursesDateMap:ICourseDates[];
    markerReadySEO: string;
    constructor(private pgCalendarData:IPgCalendarDataService,private $rootScope:IRootScope,
                private CourseResource:ICourseResource, private $sce,
                private $location, private orderByFilter:ng.IFilterOrderBy, private smoothScroll,
                private SeoPageResource:ISeoPageResource, private $q) {

        this.getCourses();
    }


    setCoursesCalendarTemplate(picture, name) {

            return ` <div class="course-marker"> 
                       <img  src="${picture}" alt="">                                  
                      <div class="it-name">${name}</div></div>`

    }

    getCourses() {
        this.seo = this.SeoPageResource.query({query: {"name": "calendar"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        this.coursesDateMap = [];
        this.courses = this.CourseResource.query();
        this.courses.$promise.then( (courses) => {

                this.courses = this.orderByFilter( courses, "order" );
                angular.forEach( courses, (course) => {
                    if (course.isVisible) {
                        this.createDatesMap( course );
                        this.setCalendarContent( course );
                    }
                } );

                this.scrollToMain();

            });

        this.$q.all([this.courses.$promise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
    }


    scrollToMain() {
        var options = {
            duration: 700,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById( 'mainContent' );
        this.smoothScroll( element, options );
    }

    setCalendarContent(course:ICourse) {
        angular.forEach( course.days, (courseDate) => {
            let content = this.setCoursesCalendarTemplate( course.avatar, course.name );
            this.pgCalendarData.setDayContent(   new Date(courseDate.date), this.$sce.trustAsHtml( content ) );
        } );
    }


    createDatesMap(course:ICourse) {
        //TODO: change coursesDateMap.date to Date[] like in CourseResourse
        let coursesDateChunk = course.days.map( (courseDate) => {
            return {coursesId: course._id, date:  new Date(courseDate.date)}
        } );
        this.coursesDateMap = this.coursesDateMap.concat( coursesDateChunk );
    }

    dayClick(date:Date) {
        angular.forEach( this.coursesDateMap, (course) => {
            var cDate =  course.date ;
            if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
                this.$location.url( '/academy/course/' + course.coursesId );
                return;
            }

        } );

    }
}

export let CourseCalendarComponentUrl = "/academy/calendar";
export let CourseCalendarComponentName = 'pgCourseCalendar';
export let CourseCalendarComponentOptions = {
    template: template,
    controller: CalendarComponentController
};