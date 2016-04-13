var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});
var VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [VideoSchema],
    hearFormsPhotos: [PhotoSchema],
    historyPhotos: [PhotoSchema],
    author: {
        name: String, 
        photoUrl: String
    },
    courseModulesDates: [Date],
    isVisible: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);