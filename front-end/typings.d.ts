/// <reference path="../typings/index.d.ts" />
/// <reference path="../typings/browser.extensions.d.ts" />
/// <reference path="../typings/shared.d.ts" />

import {ISeoPage} from "./app/resources/seo.page.resource";
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
    seo:ISeoPage;
}
