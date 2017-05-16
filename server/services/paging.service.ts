import {Response} from "express-serve-static-core";

export let paging = {
    //expr-mongoose-restify understands only skip/limit
    preRead: (req, res, next) => {
        let limit = (parseInt(req.query.perPage) || parseInt(process.env.DEFAULT_QUERY_LIMIT));
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
            let perPage = parseInt(req.query.perPage) || parseInt(process.env.DEFAULT_QUERY_LIMIT);
            let page = req.query.page || 1;
            res.set(paging.getHeaders(page, perPage, req.erm.totalCount));
        }
        next();
    },
    getHeaders: (page:number, perPage:number, totalCount:number) => {
        return {
            'X-Total-Count': totalCount,
            'X-Per-Page': perPage || parseInt(process.env.DEFAULT_QUERY_LIMIT),
            'X-Page': page || 1,
            'Access-Control-Expose-Headers':"x-total-count, x-per-page, x-page"
        };
    }
}
