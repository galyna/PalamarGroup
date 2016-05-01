import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import restEndpoint from './rest.endpoint';
import userEndpoint from './user.endpoint';
import courseEndpoint from './course.endpoint';
import photoEndpoint from './photo.endpoint';
import * as bcrypt from 'bcrypt-nodejs';
//models
import User from '../models/user';
import Contact from '../models/contact';
import Course from '../models/course';
import Order from '../models/order';

let api = express.Router();

api.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(403);
    }
    User.findOne({email: email})
        .then((user) => {
            if (!user) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).send({error: err});
                }
                if (!result) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
                var signOptions = {
                    expiresIn: (1440 * 60).toString() //1 day
                };
                var token = jwt.sign(user._doc, 'secretKey', signOptions);
                res.json({
                    token: token,
                    user: {
                        email: user.email,
                        id: user._id
                    }
                });
            });
        })
        .catch((err) => {
            res.status(500).send({error: err});
        });
});

api.use('/contact', restEndpoint(Contact));
api.use('/course', courseEndpoint, restEndpoint(Course));
api.use('/order', restEndpoint(Order));
api.use('/user', userEndpoint);
api.use('/photo', photoEndpoint);

export default api;