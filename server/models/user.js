var mongoose = require('mongoose');
var Shema = mongoose.Schema;
var UserShema = new Shema({
    email: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = mongoose.model('User', UserShema);