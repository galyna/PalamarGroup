var mongoose = require('mongoose');
var AlbumSchema = mongoose.Schema({
    'name': {
        type: String,
        unique: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    compositions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Composition'
    }]
});

module.exports = mongoose.model('Album', AlbumSchema);