declare namespace angular.angularFileUpload {
    interface IUploadService {
        dataUrltoBlob(dataurl: string, name: string):Blob;
    }  
}

declare module "aos" {
    interface AOSConstructor {
        new (): any,
        init():any,
        refresh():any
    }
    let AOS: AOSConstructor;
    export = AOS;
}

