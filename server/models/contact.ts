var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: String,
    address: String
});

export default mongoose.model('Contact', ContactSchema);