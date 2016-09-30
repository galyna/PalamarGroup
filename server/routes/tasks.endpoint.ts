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
        let event = req.query.task;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {
            master.tasks.push( req.body );
            await master.save();
            var tasks = master.tasks.filter( (task)=> {
                return task && task.scheduler.id == req.body.scheduler.id;
            } );
            if (tasks.length > 0) {
                res.json( tasks[0] );
            }

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

            var tasks = master.tasks.filter( (task)=> {
                return task && task._id == req.body._id;
            } );
            if (tasks.length > 0) {
                Object.assign( tasks[0], req.body );
                await master.save();
                res.json( tasks[0] );
            }else { res.status(500)}

        } catch (err) {
            next( err );
        }
        res.end();
    } )


tasksApi.route( '/task/:taskId' )
    .delete( auth, currentUser.is( 'salonModerator' ), async(req:any, res, next) => {
        let master:IMasterModel;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {

            master.tasks.remove( req.params.taskId );
            await master.save();
            res.json( {course: master} );
        } catch (err) {
            return next( err );
        }
        res.end();
    } );

tasksApi.route( '/tasks/:start/:end' )
    .get( async(req:any, res, next) => {
        let master:IMasterModel;
        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {

            var tasks = master.tasks.filter( (task)=> {
                return task && task.scheduler.start > new Date( req.params.start ) && task.scheduler.start < new Date( req.params.end );
            } );

            res.json( tasks );
        } catch (err) {
            return next( err );
        }
        res.end();
    } );