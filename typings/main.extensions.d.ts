declare module "express-serve-static-core" {
    interface Request {
        files: any;
    }
}

declare module "express-slash" {
    import {RequestHandler} from "express-serve-static-core";
    function slash(statusCode?: number): RequestHandler;
    namespace slash {}
    export = slash;
}

declare module "express-restify-mongoose" {
    import {RequestHandler} from "express-serve-static-core";
    //noinspection ReservedWordAsName
    export interface IOptions{
        prefix?: string,
        version?: string,
        idProperty?: string,
        restify?: boolean,
        name?: string,
        allowRegex?: boolean,
        runValidators?: boolean,
        readPreference?: string,
        totalCountHeader?: boolean|string,
        private?: string[],
        protected?: string[],
        lean?: boolean,
        findOneAndUpdate?: boolean,
        findOneAndRemove?: boolean,
        preMiddleware?: RequestHandler | [(req, res, next) => any],
        preCreate?: (req, res, next) => any | [(req, res, next) => any],
        preRead?: (req, res, next) => any | [(req, res, next) => any],
        preUpdate?: (req, res, next) => any | [(req, res, next) => any],
        preDelete?: (req, res, next) => any | [(req, res, next) => any],
        access?: (req, done?) => string,
        contextFilter?:  (model, req, done) => any,
        postCreate?: (req, res, next) => any | [(req, res, next) => any],
        postRead?: (req, res, next) => any | [(req, res, next) => any],
        postUpdate?: (req, res, next) => any | [(req, res, next) => any],
        postDelete?: (req, res, next) => any | [(req, res, next) => any],
        outputFn?: (req, res, next) => any,
        postProcess?: (req, res) => any,
        onError?: (req, res, next) => any,
        limit?: number
    }


    export function serve(router: any, model: any, options?:IOptions): any;
    export function defaults(options:IOptions);
}

declare module "xoauth2" {

    //TODO: check
    export interface XOAuth2GeneratorOptions {
        user: string;
        clientId: string;
        clientSecret: string;
        refreshToken: string;
        accessToken?: string;
    }
    
    export interface Generator {
        //TODO: implement
    }
    
    export function createXOAuth2Generator(XOAuth2GeneratorOptions): Generator;
}

declare module "mongoose" {
    export interface Model<T extends Document> extends NodeJS.EventEmitter {
        findOne(cond?: Object): Promise<T>;
        findOne(cond: Object, fields: Object): Promise<T>;
        findOne(cond: Object, fields: Object, options: Object): Promise<T>;

        findByIdAndRemove(id: string): Promise<T>;
        findByIdAndRemove(id: string, options: Object): Promise<T>;

        findOneAndUpdate(cond: Object, update: Object): Promise<T>;
        findOneAndUpdate(cond: Object, update: Object, options: FindAndUpdateOption): Promise<T>;

        findById(id: string): Promise<T>;
        findById(id: string, fields: Object): Promise<T>;
        findById(id: string, fields: Object, options: Object): Promise<T>;

        find(cond: Object): Promise<T[]>;
        find(cond: Object, fields: Object): Promise<T[]>;
        find(cond: Object, fields: Object, options: Object): Promise<T[]>;

        remove(cond: Object): Promise<{}>;

        count(conditions: Object): Promise<number>;

    }

    export interface Document {
        save<T>(callback?: (err: any, res: T) => void): Promise<void>;
    }
}