var express = require('express');
var app = express();
var config = require('./config');
var api = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var restEndpoint = require('./routes/restEndpoint');
//models
var User = require('./models/user');
var Artist = require('./models/artist');
var Album = require('./models/album');
var Composition = require('./models/composition');

var authenticate = require('./routes/authenticate');

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

api.get('/setup', function(req, res){
    var adminEmail = 'admin@admin.com';
    User.remove({email: adminEmail}, function(){
        var admin = new User({
            email: adminEmail,
            password: 'admin'
        });
        admin.save().then(function(admin){
            if(!admin){res.status(500);return;}

            res.status(201);
            res.json([admin]);
            console.log('admin user created');
        });
    });
});

api.post('/authenticate', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        res.status(403);
        return;
    }
    User.where({email: email}).findOne()
        .then(function(user){
            if(user.password !== req.body.password){
                throw new Error;
            }
            var token = jwt.sign(user, 'secretKey', {
                expiresIn: 1440*60 //1 day
            });
            res.json({
                token: token,
                user: {
                    email: user.email,
                    id: user._id
                }
            })
        }).catch(function(err){
            res.status(403);
            res.json({error: err})
        });
});

api.route('/user')
    .get(authenticate,function(req, res){
        User.find()
            .then(function(users){
                res.json({users: users});
            })
            .catch(function(err){
                res.status(500);
                res.json(err);
            });
    })
    .post(function(req, res){
        if(!req.body.email || !req.body.password){
            res.status(400);
        }
        User.where({email: req.body.email}).find(function(docs){
            if (!docs){
                var user = new User({
                    email: req.body.email,
                    password: req.body.password
                });
                user.save().then(function(){
                    res.json({
                        email: user.email,
                        id: user._id
                    });
                });
            }else{
                console.log('user exists: ', req.body.email);
                res.status(500);
                res.json(new Error("User exists!"));
            }
        })
    });

api.route('/user/:id')
    .get(authenticate,function(req, res){
        User.where({_id: req.params.id}).findOne(function(err, user){
            if(!user){
                res.status(404);
                res.send();
                return;
            }
            res.json(user);
        });
    })
    .delete(authenticate,function(req, res){
        User.where({_id: req.params.id}).remove().then(function(user){
            if(!user) {
                res.status(404)
            }
            res.send();
        })
    })
    .put(authenticate,function(req, res){
        User.where({_id: req.params.id}).findOneAndUpdate({password: req.body.password})
            .then(function(user){
                if(!user) {
                    res.status(404)
                }
                res.send();
            });
    });

api.use('/artist', restEndpoint(Artist));
api.use('/album', restEndpoint(Album));
api.use('/composition', restEndpoint(Composition));

app.use('/api', api);

//static content
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));

app.listen(port);
console.log('api is running at localhost:' + port);