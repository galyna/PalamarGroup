import {Router} from "express";
import {Course} from "../models/course";
import {Comment} from "../models/comment";

let api = Router();

api.route('/comment')
    //course comments list
    .get(async(req, res) => {
        let params = req.params; //{id:''}
        try {
            let comments = await Course.find({"_id": params.id}, {"_id": 1, "comments": 1});
            res.json({comments: comments});
        } catch (err) {
            res.status(500).json(err);
        }
    })
    //create comment in course
    .post(async(req: any, res) => {
        let course, comment;
        try {
            course = await Course.findOne({"_id": req.courseId});
        } catch (err) {
            res.status(500).json(err);
        }
        try{
            comment = await new Comment(req.body).save();
        }catch (err) {
            res.status(500).json(err);
        }
        try {
            course.comments.push(comment.id);
            await course.save();
            res.json({course: course});
        } catch (err) {
            res.status(500).json(err);
        }

    });

export let courseApi = api;