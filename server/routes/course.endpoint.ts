import {Router} from "express";
import {Course} from "../models/course";


let api = Router();

api.route('/comment')
    .post(async(req: any, res) => {
        let course, comment;
        try {
            course = await Course.findOne({"_id": req.courseId});
        } catch (err) {
            res.status(500).json(err);
        }

        try {
            course.comments.push(req.body);
            await course.save();
            res.json({course: course});
        } catch (err) {
            res.status(500).json(err);
        }

    })
    .put(async(req: any, res, next) => {
        let course, comment;
        try {
            course = await Course.findOne({"_id": req.courseId});
        } catch (err) {
            return next(err);
        }

        try {
            comment = course.comments.id(req.body._id);
            Object.assign(comment, req.body);
            // course.comments.splice(course.comments.indexOf(comment),1,req.body);
            await course.save();
            res.end();
        } catch (err) {
            next(err);
        }
    });

api.route('/comment/:commentId')
    .delete(async(req: any, res) => {
        let course, comment;
        try {
            course = await Course.findOne({"_id": req.courseId});
        } catch (err) {
            res.status(500).json(err);
        }

        try {

          course.comments.id(req.params.commentId).remove();
            await course.save();
            res.json({course: course});
        } catch (err) {
            res.status(500).json(err);
        }

    });

    //create comment in course


export let courseApi = api;

