
export interface IConstants {
    host: string,
    baseUrl:string,
    apiUrl:string,
    uploadDir:string,
    photoUrl:string,
    favorCategories:string[]
}

export let constants:IConstants = {
    host: 'http://staging.palamar.com.ua',
    baseUrl: '/',
    apiUrl: '/api',
    uploadDir: '/content/uploads',
    photoUrl: '/api/photo',
    favorCategories:["Стрижки","Нігтьова естетика","Візаж"]

};

debugConfig.$inject = ['$compileProvider'];
export function debugConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}

materialConfig.$inject = ['$mdIconProvider'];
export function materialConfig($mdIconProvider:ng.material.IIconProvider) {
    $mdIconProvider
        .iconSet("action", "/content/images/icons/svg-sprite-action.svg")
        .iconSet("social", "/content/images/icons/svg-sprite-social.svg")
        .iconSet("communication", "/content/images/icons/svg-sprite-communication.svg")
        .iconSet("content", "/content/images/icons/svg-sprite-content.svg")
        .iconSet("navigation", "/content/images/icons/svg-sprite-navigation.svg")
        .iconSet("av", "/content/images/icons/svg-sprite-av.svg")
}