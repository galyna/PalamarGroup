import IModel = pg.models.IModel;

export interface IConstants {
    baseUrl:string,
    apiUrl:string,
    uploadDir:string,
    photoUrl:string
    newModel:IModel
}

export let constants:IConstants = {
    baseUrl: '/',
    apiUrl: '/api',
    uploadDir: '/content/uploads',
    photoUrl: '/api/photo',
    //TODO: what's that? move to the corresponding location
    newModel: {
        name: '',
        phone: '',
        email: '',
        address: '',
        fasPhotoUrl: '../content/images/fas.jpg',
        profilePhotoUrl: '../content/images/prifile.jpg',
        backPhotoUrl: '../content/images/back.jpg',
        fullSizePhotoUrl: '../content/images/fullsize.jpg'
    }
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