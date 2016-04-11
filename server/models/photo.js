/**
 * Created by Galyna on 10.04.2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Photo', PhotoSchema);