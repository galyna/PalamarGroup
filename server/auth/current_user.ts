let ConnectRoles = require('connect-roles');
let currentUser = new ConnectRoles();

//TODO: only for development, remove!!!
import config from '../config';
currentUser.use(() => {
    return config.env === 'dev';
});
//TODO: only for development, remove!!!

currentUser.use('admin', (req) => {
    return req.user && req.user.roles.indexOf('admin') > -1;
});

currentUser.use('moderator', (req) => {
    return req.user && req.user.roles.indexOf('moderator') > -1;
});

currentUser.use('user', (req) => {
    return req.user && req.user.roles.indexOf('user') > -1;
});

export default currentUser;