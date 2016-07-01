let ConnectRoles = require('connect-roles');
export let currentUser = new ConnectRoles();

currentUser.use('admin', (req) => {
    return req.user && req.user.roles.indexOf('admin') > -1;
});

currentUser.use('moderator', (req) => {
    return req.user && (currentUser.is('admin') || req.user.roles.indexOf('moderator') > -1);
});

currentUser.use('user', (req) => {
    return req.user && (currentUser.is('admin') || currentUser.is('moderator') || req.user.roles.indexOf('user') > -1);
});