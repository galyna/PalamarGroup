var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    videos: [String],
    photos: [String],
    courseModules: [{type: Schema.Types.ObjectId, ref: 'CourseModule'}]
});

module.exports = mongoose.model('Course', CourseSchema);