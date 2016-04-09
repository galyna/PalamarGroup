var ConnectRoles = require('connect-roles');
var currentUser = new ConnectRoles();

currentUser.use('admin', function(req) {
    return (req.user.roles.indexOf('admin') > -1);
});

currentUser.use('moderator', function(req) {
    return req.user.roles.indexOf('moderator') > -1;
});

currentUser.use('user', function(req) {
    return req.user.roles.indexOf('user') > -1;
});

module.exports = currentUser;