/**
 * Created by Galyna on 12.06.2016.
 */
import {Router} from "express";
import {Course} from "../models/course";

let getCommentsApi = Router();

getCommentsApi.route( '/' )
    //course comments list
    .get( async(req, res) => {
        try {
            // let comments = await Course.find( {comments: {$exists: true, $not: {$size: 0}}}, {
            //     comments: 1,
            //     _id: 1,
            //     name: 1
            // } )

            Course.aggregate( [

                {
                    $match: {comments: {$not: {$size: 0}}}

                }, {   // SELECT
                    $unwind: "$comments",
                }, {
                    $project: {
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
                    }
                }], (err, courses) => {
                if (!courses) {
                    res.status( 404 ).send( {error: {message: "User not found"}} );
                }
                res.json( courses )
            } );

        } catch (err) {
            res.status( 500 ).json( err );
        }
    } )


export let courseGetCommentsApi = getCommentsApi;