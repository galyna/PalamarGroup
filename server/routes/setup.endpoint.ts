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

setupRouter.get('/:model', function (req, res) {
    let fileName = req.params.model.toLowerCase();
    let modelName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    try {
        var Model = require('../models/' + fileName)[modelName];
    }catch(err){
        return res.status(500).send({error: {message: fileName + ' model doesn\'t exist'}});
    }
    var modelData = data[fileName];
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