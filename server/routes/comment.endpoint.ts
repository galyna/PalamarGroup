/**
 * Created by Galyna on 12.06.2016.
 */
import {Router} from "express";
import {Course} from "../models/course";

let getCommentsApi = Router();

getCommentsApi.route( '/' )
    //course comments list
    .get( async(req, res, next) => {
        try {
            let comments = await Course.aggregate([
                {$match: {comments: {$not: {$size: 0}}}},
                {$unwind: "$comments"},
                {$project: {
                        _id: "$comments._id",
                        name: "$comments.name",
                        isModerated: "$comments.isModerated",
                        isVisible: "$comments.isVisible",
                        text: "$comments.text",
                        date: "$comments.date",
                        isCourseVisible: "$isVisible",
                        courseId: '$_id',
                        courseDates:"$courseModulesDates",
                        courseName: '$name'
                    }}
            ]).exec();
            if (!comments) {
                res.status(404).end();
            }
            res.json(comments);
        } catch (err) {
            next(err);
        }
    });


export let courseGetCommentsApi = getCommentsApi;