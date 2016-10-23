export interface IConstants {
    host:string,
    baseUrl:string,
    apiUrl:string,
    uploadDir:string,
    photoUrl:string,
    favorCategories:any[],
    orderStatuses:any[],
    showSalon:boolean
}

export let constants:IConstants = {
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
        {_id: "hear", name: "ПЕРУКАРСЬКІ ПОСЛУГИ"},
        {_id: "neils", name: "НІГТЬОВА ЕСТЕТИКА"},
        {_id: "makeup", name: "ВІЗАЖ"}],
    showSalon:true
};

debugConfig.$inject = ['$compileProvider'];
export function debugConfig($compileProvider) {
    $compileProvider.debugInfoEnabled( false );
}

materialConfig.$inject = ['$mdIconProvider'];
export function materialConfig($mdIconProvider:ng.material.IIconProvider) {
    $mdIconProvider
        .iconSet( "action", "/content/images/icons/svg-sprite-action.svg" )
        .iconSet( "social", "/content/images/icons/svg-sprite-social.svg" )
        .iconSet( "communication", "/content/images/icons/svg-sprite-communication.svg" )
        .iconSet( "content", "/content/images/icons/svg-sprite-content.svg" )
        .iconSet( "navigation", "/content/images/icons/svg-sprite-navigation.svg" )
        .iconSet( "av", "/content/images/icons/svg-sprite-av.svg" )
}