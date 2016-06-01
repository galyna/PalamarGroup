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
