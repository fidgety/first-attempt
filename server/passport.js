const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const user = require('./user');

module.exports = function (app) {
    passport.use(new Strategy({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
    }, (token, tokenSecret, profile, cb) => {
        user.add(profile);
        return cb(null, profile);
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((obj, cb) =>{
        cb(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login/twitter',
        passport.authenticate('twitter'));

    app.get('/login/twitter/return',
    passport.authenticate('twitter', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login'
    }));
};
