var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    userName: String,
    phone: String,
    email: String,
    date: Date,
    event: {type: Schema.Types.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('Order', OrderSchema);