/// <reference path="../typings/shared.d.ts" />

declare module "connect-multiparty" {
    import * as express from '@types/express'
    export interface Request extends express.Request{
        files: any;
    }
}

