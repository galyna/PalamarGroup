declare namespace angular.angularFileUpload {
    interface IUploadService {
        dataUrltoBlob(dataurl: string, name: string):Blob;
    }  
}

declare module "aos" {
    interface AOSConstructor {
        new (): any,
        init(options: any):any,
        refresh():any
    }
    let AOS: AOSConstructor;
    export = AOS;
}

declare module "jwt-decode" {
    interface IJwtDecode{
        (token:string): string;
    }
    let jwtDecode: IJwtDecode;
    export = jwtDecode;
}
