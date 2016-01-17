const routesDB = require('../dataLayer/routes');
const extend = require('extend');

const checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }
    next();
};

module.exports = (app) => {
    app.get('/api/route/:routeName', (req, res) => {
        routesDB.get(req.params.routeName).then((route) => {
            res.json(route);
        }).catch((err) => {
            console.log('cant find route ' + req.params.routeName, err);
            res.sendStatus(404);
        });
    });

    app.post('/api/route/:routeName', checkAuthenticated, (req, res) => {

        const routeName = req.params.routeName;
        const user = req.user.username;
        const record = extend(req.body, {
            user: user,
            name: req.params.name
        });

        routesDB.save(routeName, record).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log('cant add route ' + req.params.routeName, err);
            res.sendStatus(500);
        });

    });
};
