/**
 * Created by Galyna on 29.09.2016.
 */
import {IOptions} from "express-restify-mongoose";
import {Request} from "express-serve-static-core";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {Router} from "express";
import {IMasterModel, Master, ITaskModel} from "../models/master";
import {userApi} from "./user.endpoint";
import ITask = pg.models.ITask;

export let tasksApi = Router();

export let tasksOptions:IOptions = {
    preCreate: [auth, currentUser.is( 'salonModerator' )],
    preUpdate: [auth, currentUser.is( 'salonModerator' )],
    preDelete: [auth, currentUser.is( 'salonModerator' )],
    access: function (req:Request) {
        return 'public';
    }
};

tasksApi.route( '/task' )
    .post( auth, currentUser.is( 'salonModerator' ), async(req:any, res, next) => {
        let master:IMasterModel;
        let newTask = req.query.task;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {
            master.tasks.push( req.body );
            await master.save();
           // newTask = master.tasks.find((t)=>{return t.scheduler.id==newTask.scheduler.id });
            res.json( master );
        } catch (err) {
            return next( err );
        }

        res.end();
    } )
    .put( auth, currentUser.is( 'salonModerator' ), async(req:any, res, next) => {
        let master:IMasterModel;

        let task:ITaskModel;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            next( err );
        }

        try {
           task = master.tasks.id( req.body._id );
             Object.assign(task, req.body);
            await master.save();
            res.json( task );
        } catch (err) {
            next( err );
        }
        res.end();
    } )


tasksApi.route('/task/:taskId')
    .delete( auth, currentUser.is( 'salonModerator' ),async(req:any, res,next) => {
        let master:IMasterModel;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {

            master.tasks.remove(req.params.taskId);
            await master.save();
            res.json({course: master});
        } catch (err) {
            return next( err );
        }
        res.end();
    } );