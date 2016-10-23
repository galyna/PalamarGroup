import {IRootScope} from "../typings";
/**
 * Created by Galyna on 16.03.2016.
 */

materialConfig.$inject = ['$mdThemingProvider','uiGmapGoogleMapApiProvider','$mdDateLocaleProvider'];
export function materialConfig($mdThemingProvider:ng.material.IThemingProvider,uiGmapGoogleMapApiProvider,$mdDateLocaleProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

    // Example of a French localization.
    $mdDateLocaleProvider.months = ['Січень', 'Лютий', 'Березень',"Квітель",'Травень','Липень', 'Червень', 'Серпень',"Вересень" ,'Жовтень', 'Листопад', 'Грудень'];
    $mdDateLocaleProvider.shortMonths = ['Січ', 'Лют', 'Бер',"Кві",'Тра','Лип', 'Чер', 'Сер',"Вер" ,'Жов', 'Лис', 'Гру'];
    $mdDateLocaleProvider.days = ['Понеділок', 'Вівторок', 'Середа',"Четвер","П'ятниця", 'Субота', 'Неділя' ];
    $mdDateLocaleProvider.shortDays = ['Пон', 'Вів', 'Сер',"Чет","П'ят", 'Суб', 'Нед'];

    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;

  

    $mdDateLocaleProvider.msgCalendar = 'Календар';
    $mdDateLocaleProvider.msgOpenCalendar = 'Відкрийте календар';

    // You can also set when your calendar begins and ends.
    $mdDateLocaleProvider.firstRenderableDate = new Date(1776, 6, 4);
    //$mdDateLocaleProvider.lastRenderableDate = new Date(2012, 11, 21);
}
