const app = require('express')();
const authentication = require('./passport');
const api = require('./api');
const expressSetup = require('./middleware/expressSetup');
const commonMiddleWare = require('./middleware/common');
const routes = require('./dataLayer/routes');

expressSetup(app);
authentication(app);
api(app);

app.get('/', commonMiddleWare, (req, res) => {
    res.render('dataForClient', res.locals.clientData);
});

app.get('/planner', commonMiddleWare, (req, res) => {
    res.render('dataForClient', res.locals.clientData);
});

app.get('/route/:routeName', commonMiddleWare, (req, res) => {
    routes.get(req.params.routeName).then((route) => {
        res.locals.clientData.route = JSON.stringify(route);
        res.render('dataForClient', res.locals.clientData);
    });
});

app.listen('3004', () => {
    console.log('server ready and listening on port 3000');
});
