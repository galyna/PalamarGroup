import authenticate from "../auth/authenticate";
import currentUser from '../auth/current_user';
import {Router} from "express";
import * as bcrypt from 'bcrypt-nodejs';
import {User} from '../models/user';
let userApi = Router();

userApi.route('/')
    .get(authenticate, currentUser.is('admin'), (req, res) => {
        User.find({}, {"email": 1, "roles": 1})
            .then((users) => {
                res.json({users: users});
            })
            .catch((err) => {
                res.status(500);
                res.json(err);
            });
    })
    .post((req, res) => {
        if(!req.body.email || !req.body.password){
            res.status(400).send("email and/or password fields not provided");
            return;
        }
        User.findOne({email: req.body.email}, {email: 1}).then((docs) => {
            if (docs){
                res.status(409).send(new Error("email already registered"));
            }
            bcrypt.hash(req.body.password, null, null, (err, hash) => {
                if(err) throw err;

                var user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save().then(() => {
                    res.status(201).json({
                        email: user.email,
                        id: user._id
                    });
                });
            });

        }).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
    });

userApi.route('/:id')
    .get(authenticate, currentUser.is('admin'), (req, res) => {
        User.findOne({_id: req.params.id}).then((err, user) => {
            if(!user){
                res.status(404).send(null);
                return;
            }
            res.json(user);
        });
    })
    .delete(authenticate, currentUser.is('admin'), (req, res) => {
        User.findByIdAndRemove(req.params.id).then((user) => {
            if(!user) {
                res.status(404)
            }
            res.send(null);
        })
    })
    //TODO: add update password flow
    .put(authenticate, currentUser.is('admin'), (req, res) => {
        var updateRequest = Object.assign({}, req.body);
        updateRequest.password = bcrypt.hashSync(updateRequest.password);
        delete updateRequest.id;
        User.findOneAndUpdate({_id: req.params._id}, updateRequest)
            .then((user) => {
                if(!user) {
                    res.status(404).send({error: {message: "User not found"}});
                }
                res.send(null);
            });
    });

export default userApi;
