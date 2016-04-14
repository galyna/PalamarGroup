var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    date: {type:Date, default: Date.now},
    event: {type: Schema.Types.ObjectId, ref: 'Course'},
    answered: {type:Boolean, default: false}
});

module.exports = mongoose.model('Order', OrderSchema);