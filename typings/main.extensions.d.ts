declare module "express-serve-static-core" {
    interface Request {
        files: any;
    }
}

declare module "mongoose" {
    export interface Model<T extends Document> extends NodeJS.EventEmitter {
        findOne(cond?: Object, callback?: (err: any, res: T) => void): Promise<T>;
        findOne(cond: Object, fields: Object, callback?: (err: any, res: T) => void): Promise<T>;
        findOne(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T) => void): Promise<T>;

        findByIdAndRemove(id: string, callback?: (err: any, res: T) => void): Promise<T>;
        findByIdAndRemove(id: string, options: Object, callback?: (err: any, res: T) => void): Promise<T>;

        findOneAndUpdate(cond: Object, update: Object, callback?: (err: any, res: T) => void): Promise<T>;
        findOneAndUpdate(cond: Object, update: Object, options: FindAndUpdateOption, callback?: (err: any, res: T) => void): Promise<T>;

        findById(id: string, callback?: (err: any, res: T) => void): Promise<T>;
        findById(id: string, fields: Object, callback?: (err: any, res: T) => void): Promise<T>;
        findById(id: string, fields: Object, options: Object, callback?: (err: any, res: T) => void): Promise<T>;

        find(cond: Object, callback?: (err: any, res: T[]) => void): Promise<T[]>;
        find(cond: Object, fields: Object, callback?: (err: any, res: T[]) => void): Promise<T[]>;
        find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): Promise<T[]>;

        remove(cond: Object, callback?: (err: any) => void): Promise<{}>;

    }

    export interface Document {
        save<T>(callback?: (err: any, res: T) => void): Promise<void>;
    }
}

// interface ObjectConstructor {
//     assign(target: any, ...sources: any[]): any;
// }