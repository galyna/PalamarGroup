/**
 * Created by Galyna on 12.06.2016.
 */
import {Router} from "express";
import {Course} from "../models/course";
import {config} from "../config";
import {paging} from "../services/paging.service";
import {Request} from "express-serve-static-core";

let getCommentsApi = Router();

interface CustomRequest extends Request {
    totalCount:number
}

function getSortObj(sortString: string){
    try{
        let sortObj={};
        let rawSort = JSON.parse(decodeURI(sortString));
        Object.keys(rawSort).forEach((prop)=>{
            if(!rawSort.hasOwnProperty(prop)) return;
            sortObj["comments." + prop] = rawSort[prop];
        });
        return sortObj;
    }catch(err) {
        return undefined;
    }
}

getCommentsApi.route('/')
//course comments list
    .get(paging.preRead,
        async(req:CustomRequest, res, next) => {
            try {
                let totalCount = await <any>Course.aggregate([
                    {$match: {comments: {$not: {$size: 0}}}},
                    {$unwind: "$comments"},
                    {$group: {_id: null, count: {$sum: 1}}}
                ]).exec();
                req.totalCount = totalCount[0].count;
                next();
            } catch (err) {
                next(err);
            }
        },
        async(req:CustomRequest, res, next) => {
            let skip = req.query.skip || 0;
            let limit = req.query.limit || config.defaultQueryLimit;
            let sort = getSortObj(req.query.sort + "");
            try {
                let aggr = <any>[
                    {$match: {comments: {$not: {$size: 0}}}},
                    {$unwind: "$comments"}
                ];
                if(sort) aggr.push({$sort: sort});
                aggr = aggr.concat([
                    {$skip: skip},
                    {$limit: limit},
                    {$project: {
                        _id: "$comments._id",
                        name: "$comments.name",
                        isModerated: "$comments.isModerated",
                        isVisible: "$comments.isVisible",
                        text: "$comments.text",
                        date: "$comments.date",
                        isCourseVisible: "$isVisible",
                        courseId: '$_id',
                        courseName: '$name'
                    }}
                ]);
                let comments = await Course.aggregate(aggr).exec();
                res.set(paging.getHeaders(req.query.page, req.query.perPage, req.totalCount));
                res.json(comments);
            } catch (err) {
                next(err);
            }
        });


export let courseGetCommentsApi = getCommentsApi;