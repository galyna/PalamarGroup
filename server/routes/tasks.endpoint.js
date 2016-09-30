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
    let event = req.query.task;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        return next(err);
    }
    try {
        master.tasks.push(req.body);
        yield master.save();
        var tasks = master.tasks.filter((task) => {
            return task && task.scheduler.id == req.body.scheduler.id;
        });
        if (tasks.length > 0) {
            res.json(tasks[0]);
        }
    }
    catch (err) {
        return next(err);
    }
    res.end();
}))
    .put(auth_1.auth, current_user_1.currentUser.is('salonModerator'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let master;
    let task;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        next(err);
    }
    try {
        var tasks = master.tasks.filter((task) => {
            return task && task._id == req.body._id;
        });
        if (tasks.length > 0) {
            Object.assign(tasks[0], req.body);
            yield master.save();
            res.json(tasks[0]);
        }
        else {
            res.status(500).send(" task not found");
        }
    }
    catch (err) {
        next(err);
    }
    res.end();
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
exports.tasksApi.route('/tasks/:start/:end')
    .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let master;
    try {
        master = yield master_1.Master.findOne({ _id: req.masterId }).exec();
    }
    catch (err) {
        return next(err);
    }
    try {
        var tasks = master.tasks.filter((task) => {
            return task && task.scheduler.start > new Date(req.params.start) && task.scheduler.start < new Date(req.params.end);
        });
        res.json(tasks);
    }
    catch (err) {
        return next(err);
    }
    res.end();
}));
//# sourceMappingURL=tasks.endpoint.js.map