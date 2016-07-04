import passport = require("passport");
import {Strategy as LocalStrategy} from "passport-local";
import {User} from "../models/user";

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            let user = await User.findOne({email: username}).exec();
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            try {
                let valid = await user.validPassword(password);
                if (valid) {
                    return done(null, user);
                } else {
                    done(null, false, {
                        message: 'Password is wrong'
                    });
                }
            } catch (err) {
                done(null, false, {
                    message: err.message
                });
            }
        } catch (err) {
            return done(err);
        }

    }
));