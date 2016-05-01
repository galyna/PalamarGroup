var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    roles: [String]
});

export default mongoose.model('User', UserSchema);