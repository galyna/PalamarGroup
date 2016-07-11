import {RequestHandler} from "express-serve-static-core";
import {config} from "../config";
import {Response} from "express-serve-static-core";

export let paging = {
    //expr-mongoose-restify understands only skip/limit
    preRead: (req, res, next) => {
        let limit = (req.query.perPage || config.defaultQueryLimit);
        if (req.query.perPage) {
            req.query.limit = limit;
        }
        if (req.query.page) {
            req.query.skip = (limit * (req.query.page - 1));
        }
        next();
    },
    postRead: (req, res:Response, next) => {
        if (req.erm.totalCount) {
            let perPage = req.query.perPage || config.defaultQueryLimit;
            let page = req.query.page || 1;
            res.set(paging.getHeaders(page, perPage, req.erm.totalCount));
        }
        next();
    },
    getHeaders: (page:number, perPage:number, totalCount:number) => {
        return {
            'X-Total-Count': totalCount,
            'X-Per-Page': perPage || config.defaultQueryLimit,
            'X-Page': page || 1
        };
    }
}
