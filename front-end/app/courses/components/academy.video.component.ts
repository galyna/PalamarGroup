import {
    IAcademyVideosResource, AcademyVideosResourceName,
    IAcademyVideos
} from "../../resources/academy.video.resource";
import {ISeoPageResource, SeoPageResourceName} from "../../resources/seo.page.resource";
import {SalonResourceName} from "../../resources/salon.resource";

const template = `
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "item": {
      "@id": "http://palamar.com.ua/academy",
      "name": "Академія",
      "image": "http://palamar.com.ua/content/images/bg/courses/dates/IMG_7095_1539_1026.jpg"
    }
  },{
    "@type": "ListItem",
    "position": 2,
    "item": {
      "@id": "http://palamar.com.ua/academy/videos",
      "name": "Відео"
      
    }
  }]
}
</script>
 <script type='application/ld+json'>
{
            "@context": "http://www.schema.org",
            "@type": "EducationalOrganization",
            "name": "PALAMAR GROUP ACADEMY",
            "url": "http://palamar.com.ua/academy",
            "founder": {
                "@context": "http://schema.org/",
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
               "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                            "addressLocality": "Львів, Україна",
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
<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">
    <div layout="row" flex>
        <div class="page-delimiter md-padding" flex>
            <div class="fit-screen-wrap invers header">
                <div hide show-gt-xs='true' class="md-display-1"> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
                <div hide show-xs="true" class="md-headline""> ВЧИМОСЬ У ПРОФЕСІОНАЛІВ</div>
            </div>

        </div>
    </div>

 <div ng-repeat="group in $ctrl.videos">
 
   <div layout="row" flex  >
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers " >
                <div  class="md-display-1"> {{::group.name}}</div>
            </div>

        </div>
    </div>
    <div layout="row" layout-align="center center" >
        <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="85" >
            <div layout="column" layout-margin  layout-align="center center" class="embed-responsive-container" >
                <md-card md-whiteframe="6" class="  courses-videos" temprop="workPerformed" itemscope="" itemtype="http://schema.org/CreativeWork"
                         ng-repeat="video in ::group.videos track by $index"
                         flex>
                          <div itemprop="creator" itemscope itemtype="http://schema.org/BeautySalon">
                            <meta itemprop="name" content="PALAMAR GROUP"/>
                            <meta itemprop="image"
                                  content="http://palamar.com.ua/content/images/logo/palamar_logo.png"/>
                            <meta itemprop="address" content="Львів,Україна"/>
                            <meta itemprop="telephone" content="+38 067 264 6216"/>
                        </div>
                        
                        <meta itemprop="image" content="http://img.youtube.com/vi/{{video.url}}/mqdefault.jpg"/>
                        <div flex class="embed-responsive embed-responsive-16by9"
                             class="embed-responsive embed-responsive-16by9" itemscope
                             itemtype="http://schema.org/VideoObject">
                            <meta itemprop="description" content="{{::video.name}}"/>
                            <meta itemprop="name" content="{{::video.name}}"/>
                            <meta itemprop="thumbnailUrl"
                                  content="http://img.youtube.com/vi/{{video.url}}/mqdefault.jpg"/>
                            <meta itemprop="embedUrl" content="https://www.youtube.com/embed/{{video.url}}"/>
                            <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                           video-id="::video.url"></youtube-video>
                        </div>
                        <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                            <span itemprop="name" class="  md-margin">{{::video.name}}</span>
                        </md-card-content>
                </md-card>
            </div>
        </div>

    </div>

    
 </div>   
</div>



`;
;

export class AcademyVideoComponentController {

    static $inject = [AcademyVideosResourceName, 'smoothScroll',  SeoPageResourceName,'$q', '$rootScope'];

    videos: IAcademyVideos[];
    markerReadySEO: string;
    seo:any;

    constructor(private AcademyVideosResource: IAcademyVideosResource,private smoothScroll,private SeoPageResource:ISeoPageResource,private $q,
    private $rootScope) {

    }

    $onInit() {

        this.seo = this.SeoPageResource.query({query: {"name": "video"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        var mainPromise = this.AcademyVideosResource.query({sort: 'order'}).$promise;
        mainPromise.then((videos) => {
            this.scrollToMain();
            this.videos = videos;

        });
        this.$q.all([mainPromise, this.seo.$promise]).then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
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

}

export let AcademyVideoComponentUrl = "/academy/videos";
export let AcademyVideoComponentName = 'pgAcademyVideo';
export let AcademyVideoComponentOptions = {
    template: template,
    controller: AcademyVideoComponentController
};