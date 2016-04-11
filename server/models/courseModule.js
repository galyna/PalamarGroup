var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseModuleSchema = new Schema({
    dates: [Date],
});

module.exports = mongoose.model('CourseModule', CourseModuleSchema);