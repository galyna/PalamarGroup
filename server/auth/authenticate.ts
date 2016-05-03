import * as jwt from 'jsonwebtoken';
import config from '../config';
import {NextFunction, Request, Response} from "express-serve-static-core";

function authenticate(req: Request, res: Response, next: NextFunction): void{

    //TODO: only for development, remove!!!
    if(config.env === 'dev') return next();
    // TODO: only for development, remove!!!


    var token = req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.appSecret, function(err, decoded) {
            if (err) {
                res.status(403).send(null);
                return;
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    } else {
        // if there is no token return an error
        res.status(403).send(null);
        return;
    }
}

export default authenticate;