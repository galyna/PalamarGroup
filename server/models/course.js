var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [String],
    //TODO: create an unified photo object
    hearFormsPhotos: [{
        name: String,
        url: String,
        order: Number
    }],
    historyPhotos: [{
        name: String,
        url: String,
        order: Number
    }],
    author: {
        name: String, 
        photo: {
            name: String,
            url: String,
            order: Number
        }
    },
    courseModulesDates: [Date],
    isVisible: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);