/// <reference path="../typings/shared.d.ts" />
/// <reference types="angular-material" />
/// <reference types="angular-resource" />
/// <reference types="angular-mocks" />
/// <reference types="ng-file-upload" />
/// <reference types="jasmine" />

import * as __angular from "angular";

declare global {
    const angular: typeof __angular;
    const DayPilot: any;
}

// import {ISeoPage} from "./app/resources/seo.page.resource";
export interface IRootScope extends ng.IRootScopeService {
    loading:boolean;
    isBigSize:boolean;
    isAdminZone:() => boolean;
    socialParams:{
        host:string,
        target:string,
        title:string,
        image:string,
        description:string}
    seo:any;
    seoBase:string;
}

declare module 'angular' {
    export namespace angularFileUpload {
        interface IUploadService {
            dataUrltoBlob(dataurl: string, name: string): Blob;
        }
    }
}

