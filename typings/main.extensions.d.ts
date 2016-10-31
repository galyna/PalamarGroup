declare module "express-serve-static-core" {
    interface Request {
        files: any;
    }
}

declare module "express-slash" {
    import {PathArgument} from "~express/lib/router/index";
    function slash(statusCode?: number): PathArgument;
    namespace slash {}
    export = slash;
}

declare module "connect-roles"{
    import {RequestHandler} from "express-serve-static-core";

    interface ConnectRoles {
        use(verb: string, cb: (req) => boolean): void,
        is(verb: string): RequestHandler,
        can(verb: string): RequestHandler
    }
    
    interface ConnectRolesConstructor {
        new (): ConnectRoles;
    }
    
    var ConnectRoles: ConnectRolesConstructor;
    export = ConnectRoles;
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
        preMiddleware?: RequestHandler | RequestHandler[],
        preCreate?: RequestHandler | RequestHandler[],
        preRead?: RequestHandler | RequestHandler[],
        preUpdate?: RequestHandler | RequestHandler[],
        preDelete?: RequestHandler | RequestHandler[],
        access?: (req, done?) => string,
        contextFilter?:  (model, req, done) => any,
        postCreate?: RequestHandler | RequestHandler[],
        postRead?: RequestHandler | RequestHandler[],
        postUpdate?: RequestHandler | RequestHandler[],
        postDelete?: RequestHandler | RequestHandler[],
        outputFn?: RequestHandler,
        postProcess?: (req, res) => any,
        onError?: RequestHandler,
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
        // findOne(cond?: Object): Promise<T>;
        // findOne(cond: Object, fields: Object): Promise<T>;
        // findOne(cond: Object, fields: Object, options: Object): Promise<T>;
        //
        // findByIdAndRemove(id: string): Promise<T>;
        // findByIdAndRemove(id: string, options: Object): Promise<T>;
        //
        // findOneAndUpdate(cond: Object, update: Object): Promise<T>;
        // findOneAndUpdate(cond: Object, update: Object, options: FindAndUpdateOption): Promise<T>;
        //
        // findById(id: string): Promise<T>;
        // findById(id: string, fields: Object): Promise<T>;
        // findById(id: string, fields: Object, options: Object): Promise<T>;
        //
        // find(cond: Object): Promise<T[]>;
        // find(cond: Object, fields: Object): Promise<T[]>;
        // find(cond: Object, fields: Object, options: Object): Promise<T[]>;
        //
        // remove(cond: Object): Promise<{}>;
        //
        // count(conditions: Object): Promise<number>;

    }

    export interface Document {
        save<T>(): Promise<void>;
    }
}