declare namespace angular.angularFileUpload {
    interface IUploadService {
        dataUrltoBlob(dataurl: string, name: string):Blob;
    }  
}

declare module "AOS" {
    interface AOSConstructor {
        new (): any;
    }
    let AOS: AOSConstructor;
    export = AOS;
}

