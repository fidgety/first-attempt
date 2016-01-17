const app = require('express')();
const authentication = require('./passport');
const api = require('./api');
const expressSetup = require('./middleware/expressSetup');

expressSetup(app);
authentication(app);
api(app);

const rememberLastUrlForPassportRedirect = (req, res, next) => {
    req.session.returnTo = req.url;
    next();
};

app.get('*', rememberLastUrlForPassportRedirect, (req, res) => {
    let userInformation = {
        loggedIn: false
    };

    if (req.user) {
        userInformation = {
            username: req.user.displayName,
            photo: req.user.photos[0].value,
            loggedIn: true
        };
    }

    res.render('dataForClient', {
        user: JSON.stringify(userInformation)
    });
});

app.listen('3004', () => {
    console.log('server ready and listening on port 3000');
});
