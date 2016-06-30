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
    //create comment in course
    .put(async(req: any, res) => {
        let course, comment;
        try {
            course = await Course.findOne({"_id": req.courseId});
        } catch (err) {
            res.status(500).json(err);
        }

        try {
            comment =  course.comments.id(req.body._id);
            course.comments.splice(course.comments.indexOf(comment),1,req.body);
            await course.save();
            res.json({course: course});
        } catch (err) {
            res.status(500).json(err);
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

