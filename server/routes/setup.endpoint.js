var data = require('../test_data.json');
var express = require('express');
var setupRouter = express.Router();
var bcrypt = require('bcrypt-nodejs');
setupRouter.get('/', function () {
});
function encryptPasswords(modelData) {
    for (var i = 0; i < modelData.length; i++) {
        modelData[i].password = bcrypt.hashSync(modelData[i].password, null, null);
    }
}
setupRouter.get('/:model', function (req, res) {
    var modelName = req.params.model.toLowerCase();
    try {
        var Model = require('../models/' + modelName);
    }
    catch (err) {
        return res.status(500).send({ error: { message: modelName + ' model doesn\'t exist' } });
    }
    var modelData = data[modelName];
    if (!modelData) {
        return res.status(500).send({ error: { message: 'No data found for ' + modelName + ' model' } });
    }
    Model.remove({})
        .then(function () {
        console.log(modelName + ' collection dropped during setup');
        if (modelName === 'user') {
            encryptPasswords(modelData);
        }
        return Model.create(modelData).then(function (items) {
            res.status(201).json(items);
            console.log('test ' + modelName + ' collection created during setup');
        });
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
});
module.exports = setupRouter;
//# sourceMappingURL=setup.endpoint.js.map