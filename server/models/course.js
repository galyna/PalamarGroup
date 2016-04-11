var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [String],
    hearFormsPhotos: [String],
    historyPhotos: [String],
    author: {name: String, photourl: String},
    courseModulesDates: [Date],
    isVisible: Boolean,
});

module.exports = mongoose.model('Course', CourseSchema);