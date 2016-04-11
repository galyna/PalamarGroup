var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [String],
    hearFormsPhotos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
    historyPhotos: [{type: Schema.Types.ObjectId, ref: 'Photo'}],
    author: {name: String, photourl: {type: Schema.Types.ObjectId, ref: 'Photo'}},
    courseModulesDates: [Date],
    isVisible: Boolean,
});

module.exports = mongoose.model('Course', CourseSchema);