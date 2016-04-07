var mongoose = require('mongoose');
var ArtistSchema = mongoose.Schema({
    'name': {
        type: String,
        required: true,
        unique: true
    },
    'albums': [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
    'compositions': [{type: mongoose.Schema.Types.ObjectId, ref: 'Composition'}]
});

module.exports = mongoose.model('Artist', ArtistSchema);