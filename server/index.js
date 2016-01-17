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

const userDetails = (req, res, next) => {
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

    res.locals.clientData = {
        user: JSON.stringify(userInformation)
    };

    next();
};

app.get('/', userDetails, rememberLastUrlForPassportRedirect, (req, res) => {
    res.render('dataForClient', res.locals.clientData);
});

app.get('/planner', userDetails, rememberLastUrlForPassportRedirect, (req, res) => {
    res.render('dataForClient', res.locals.clientData);
});

app.get('/route/:routeName', userDetails, rememberLastUrlForPassportRedirect, (req, res) => {
    res.render('dataForClient', res.locals.clientData);
});

app.listen('3004', () => {
    console.log('server ready and listening on port 3000');
});
