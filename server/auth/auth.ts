import jwt = require("express-jwt");
import {config} from "../config";

export let auth = jwt({
    secret: config.appSecret
});