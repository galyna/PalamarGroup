import * as express from 'express';
var data = require('../test_data.json');

export var setupRouter = express.Router();

setupRouter.get('/', function(){
    
});

function encryptPasswords(User, usersData) {
    let userModel = new User();
    for(var i=0; i < usersData.length; i++){
        let userData = usersData[i];
        userModel.setPassword.call(userData, userData.password);
    }
}


function modelNameReplacer(match){
    if(match.charAt(0) === '.')
        match = match.slice(1);
    return match.charAt(0).toUpperCase() + match.slice(1);
}

setupRouter.get('/:model', function (req, res) {
    let modelNameRegexp = /(\.?\w{1,})/g;
    let fileName = req.params.model.toLowerCase();
    let modelName = fileName.replace(modelNameRegexp, modelNameReplacer);
    try {
        var Model = require('../models/' + fileName)[modelName];
    }catch(err){
        return res.status(500).send({error: {message: fileName + ' model doesn\'t exist'}});
    }
    var modelData = data[modelName];
    if(!modelData){
        return res.status(500).send({error: {message: 'No data found for ' + fileName + ' model'}});
    }
    Model.remove({})
        .then(function(){
            console.log( fileName + ' collection dropped during setup');
            if(fileName === 'user'){
                encryptPasswords(Model, modelData);
            }

            return Model.create(modelData).then(function (items) {
                res.status(201).json(items);
                console.log('test ' + fileName + ' collection created during setup');
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).send(err);
        });
});