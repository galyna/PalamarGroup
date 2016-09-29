"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const current_user_1 = require("../auth/current_user");
const auth_1 = require("../auth/auth");
const express_1 = require("express");
const master_1 = require("../models/master");
exports.tasksApi = express_1.Router();
exports.tasksOptions = {
    preCreate: [auth_1.auth, current_user_1.currentUser.is('salonModerator')],
    preUpdate: [auth_1.auth, current_user_1.currentUser.is('salonModerator')],
    preDelete: [auth_1.auth, current_user_1.currentUser.is('salonModerator')],
    access: function (req) {
        return 'public';
    }
};
exports.tasksApi.route('/task')
    .post(auth_1.auth, current_user_1.currentUser.is('salonModerator'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let master;
    let newTask = req.query.task;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        return next(err);
    }
    try {
        master.tasks.push(req.body);
        yield master.save();
        // newTask = master.tasks.find((t)=>{return t.scheduler.id==newTask.scheduler.id });
        res.json(master);
    }
    catch (err) {
        return next(err);
    }
    res.end();
}))
    .put(auth_1.auth, current_user_1.currentUser.is('salonModerator'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let master;
    let newTask = req.query.task;
    let task;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        return next(err);
    }
    try {
        //  task = master.tasks.id( req.body._id );
        // Object.assign(task, req.body);
        // course.comments.splice(course.comments.indexOf(comment),1,req.body);
        yield master.save();
        res.end(task);
    }
    catch (err) {
        next(err);
    }
}));
exports.tasksApi.route('/task/:taskId')
    .delete(auth_1.auth, current_user_1.currentUser.is('salonModerator'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let master;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        return next(err);
    }
    try {
        master.tasks.remove(req.params.taskId);
        yield master.save();
        res.json({ course: master });
    }
    catch (err) {
        return next(err);
    }
    res.end();
}));
//# sourceMappingURL=tasks.endpoint.js.map