const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const userDb = require('./dataLayer/users');

module.exports = function (app) {
    passport.use(new Strategy({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: 'http://localhost:3004/login/twitter/return'
    }, (token, tokenSecret, profile, cb) => {
        userDb.add(profile);
        return cb(null, profile);
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
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

    app.get('/login', (req, res) => {
        res.send('welcome');
    });
};
