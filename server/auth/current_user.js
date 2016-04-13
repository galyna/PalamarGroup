var ConnectRoles = require('connect-roles');
var currentUser = new ConnectRoles();

//TODO: only for development, remove!!!
var config = require('../config');
currentUser.use(function(){
    return config.env === 'dev';
});
//TODO: only for development, remove!!!

currentUser.use('admin', function(req) {
    return req.user && req.user.roles.indexOf('admin') > -1;
});

currentUser.use('moderator', function(req) {
    return req.user && req.user.roles.indexOf('moderator') > -1;
});

currentUser.use('user', function(req) {
    return req.user && req.user.roles.indexOf('user') > -1;
});

module.exports = currentUser;