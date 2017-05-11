let jwt = require("express-jwt");

export let auth = jwt({
    secret: process.env.APP_SECRET
});
