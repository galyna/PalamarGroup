declare module "express-serve-static-core" {
    interface Request {
        files: any;
    }
}

interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}