var express = require('express');
var app = express();
var config = require('./config');
var api = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var restEndpoint = require('./routes/rest.endpoint');
var userEndpoint = require('./routes/user.endpoint');
//models
var User = require('./models/user');
var Contact = require('./models/contact');
var Course = require('./models/course');
var CourseModule = require('./models/courseModule');
var Order = require('./models/order');

var authenticate = require('./auth/authenticate');

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


api.use('/contact', restEndpoint(Contact));
api.use('/course', restEndpoint(Course));
api.use('/course_module', restEndpoint(CourseModule));
api.use('/order', restEndpoint(Order));
api.use('/user', userEndpoint);
app.use('/api', api);

//static content
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));

app.listen(port);
console.log('api is running at localhost:' + port);