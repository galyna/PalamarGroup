let ConnectRoles = require( 'connect-roles' );
export let currentUser = new ConnectRoles();

currentUser.use( 'admin', (req) => {
    return req.user && req.user.roles.indexOf( 'admin' ) > -1;
} );

currentUser.use( 'academyModerator', (req) => {
    return req.user && (currentUser.is( 'admin' ) || req.user.roles.indexOf( 'academyModerator' ) > -1);
} );

currentUser.use( 'salonModerator', (req) => {
    return req.user && (req.user.roles.indexOf( 'admin' ) > -1 || req.user.roles.indexOf( 'salonModerator' ) > -1);
} );

currentUser.use( 'user', (req) => {
    return req.user && (currentUser.is( 'admin' )||
            req.user.roles.indexOf( 'academyModerator' ) || req.user.roles.indexOf( 'salonModerator' )
    || req.user.roles.indexOf( 'academyUser' ) || req.user.roles.indexOf( 'salonUser' ) > -1
    )
    ;
} );