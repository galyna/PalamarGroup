var data = require('../test_data.json');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');

export var setupRouter = express.Router();

setupRouter.get('/', function(){
    
});

function encryptPasswords(modelData) {
    for(var i=0; i < modelData.length; i++){
        modelData[i].password = bcrypt.hashSync(modelData[i].password, null, null);
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
                encryptPasswords(modelData);
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