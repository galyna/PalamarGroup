/**
 * Created by Galyna on 29.09.2016.
 */
import {IOptions} from "express-restify-mongoose";
import {Request} from "express-serve-static-core";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {Router} from "express";
import {IMasterModel, Master} from "../models/master";
import ITask = pg.models.ITask;
import {Task} from "../models/task";
import {Appointment} from "../models/appointment";

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
        console.dir( event );

        try {
            master = await Master.findOne( {_id: req.masterId} ).exec();
        } catch (err) {
            return next( err );
        }
        try {
            var task = await Task.create( req.body );
            master.tasks.push( task );
            await master.save();
            res.json( task );


        } catch (err) {
            return next( err );
        }

        res.end();
    } )
    .put( auth, currentUser.is( 'salonModerator' ), async(req:any, res, next) => {
        let master;
        try {
            master = await Master.findOne( {_id: req.masterId} ).populate( {
                path: 'tasks',
                match: {'_id': req.body._id }
            } ).exec();
        } catch (err) {
            next( err );
        }
        try {

            if (master.tasks.length>0) {
                Object.assign( master.tasks[0], req.body );
                await master.tasks[0].save();
                await master.save();
                res.json( master.tasks[0] );
            } else {
                res.status( 500 ).send( " task not found" )
            }

        } catch (err) {
            next( err );
        }
        res.end();
    } )


tasksApi.route( '/task/:taskId' )
    .delete( auth, currentUser.is( 'salonModerator' ), async(req:any, res, next) => {
        let master;
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
        let master;
        let tasks;
        try {
            master = await Master.findOne( {_id: req.masterId} ).populate( {
                path: 'tasks',
                match: {'scheduler.start': {$gte: new Date( req.params.start ), $lte: new Date( req.params.end )}}
            } ).exec();

            res.json( master.tasks );
        } catch (err) {
            return next( err );
        }
        res.end();
    } );