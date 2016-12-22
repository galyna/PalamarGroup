export interface IConstants {
    host: string,
    baseUrl: string,
    apiUrl: string,
    uploadDir: string,
    photoUrl: string,
    favorCategories: any[],
    rates: any[],
    orderStatuses: any[],
    showSalon: boolean
}

export let constants: IConstants = {
    host: 'http://palamar.com.ua',
    baseUrl: '/',
    apiUrl: '/api',
    uploadDir: '/content/uploads',
    photoUrl: '/api/photo',
    orderStatuses: [
        {_id: 0, name: "Новий"},
        {_id: 1, name: "Підтвірджено"},
        {_id: 2, name: "Оплачено"},
        {_id: 3, name: "Відмова"}],
    favorCategories: [
        {_id: "hear", name: "ПЕРУКАРСЬКІ ПОСЛУГИ",url:"hairdressing"},
        {_id: "neils", name: "НІГТЬОВА ЕСТЕТИКА",url:"nail-aesthetics"},
        {_id: "makeup", name: "ВІЗАЖ",url:"makeup"}],
     rates: [
        {_id: "0", name: "ВІДСУТНІЙ", text: ""},
        {_id: "1", name: "ПОЧАТКОВИЙ", text: "Junior Stylist"},
        {_id: "2", name: "СЕРЕДНІЙ", text: "Middle Stylist"},
        {_id: "3", name: "ТОП", text: "Top Stylist"}
    ],
    showSalon: true
};

debugConfig.$inject = ['$compileProvider'];
export function debugConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}

materialConfig.$inject = ['$mdIconProvider', '$mdDateLocaleProvider'];
export function materialConfig($mdIconProvider: ng.material.IIconProvider, $mdDateLocaleProvider) {


    $mdIconProvider
        .iconSet("action", "/content/images/icons/svg-sprite-action.svg")
        .iconSet("social", "/content/images/icons/svg-sprite-social.svg")
        .iconSet("communication", "/content/images/icons/svg-sprite-communication.svg")
        .iconSet("content", "/content/images/icons/svg-sprite-content.svg")
        .iconSet("navigation", "/content/images/icons/svg-sprite-navigation.svg")
        .iconSet("av", "/content/images/icons/svg-sprite-av.svg")

    // Example of a French localization.
    $mdDateLocaleProvider.months = ['Січень', 'Лютий', 'Березень', "Квітель", 'Травень', 'Липень', 'Червень', 'Серпень', "Вересень", 'Жовтень', 'Листопад', 'Грудень'];
    $mdDateLocaleProvider.shortMonths = ['Січ', 'Лют', 'Бер', "Кві", 'Тра', 'Лип', 'Чер', 'Сер', "Вер", 'Жов', 'Лис', 'Гру'];
    $mdDateLocaleProvider.days = ['Понеділок', 'Вівторок', 'Середа', "Четвер", "П'ятниця", 'Субота', 'Неділя'];
    $mdDateLocaleProvider.shortDays = ['Пн', 'Вт', 'Ср', "Чт", "Пт", 'Сб', 'Нд'];

    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;


    $mdDateLocaleProvider.formatDate = function (date) {
        if (date && typeof date.getMonth === 'function') {
            return date.toLocaleDateString();
        } else {
            return '';
        }


    };

    $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
        return $mdDateLocaleProvider.months[date.getMonth()] + ' ' + date.getFullYear();
    };
    $mdDateLocaleProvider.msgCalendar = 'Календар';
    $mdDateLocaleProvider.msgOpenCalendar = 'Відкрийте календар';

    // You can also set when your calendar begins and ends.
    $mdDateLocaleProvider.firstRenderableDate = new Date(1776, 6, 4);

}