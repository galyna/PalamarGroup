var mongoose = require('mongoose');
var CompositionSchema = mongoose.Schema({
    'name': {
        type: String,
        unique: true
    },
    'artist': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    'album': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }
});

module.exports = mongoose.model('Composition', CompositionSchema);