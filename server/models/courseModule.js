var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseModuleSchema = new Schema({
    order: Number,
    dates: [Date],
    price: Number
});

module.exports = mongoose.model('CourseModule', CourseModuleSchema);