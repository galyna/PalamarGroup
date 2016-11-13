declare namespace angular.angularFileUpload {
    interface IUploadService {
        dataUrltoBlob(dataurl: string, name: string):Blob;
    }  
}


declare module "jwt-decode" {
    interface IJwtDecode{
        (token:string): string;
    }
    let jwtDecode: IJwtDecode;
    export = jwtDecode;
}

declare var DayPilot: any;
