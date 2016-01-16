const db = require('../db');
const extend = require('extend');

const checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }
    next();
};

module.exports = (app) => {
    app.get('/api/route/:routeName', checkAuthenticated, (req, res) => {
        const routes = db().routes;

        routes.findOne({
            name: req.params.routeName
        }, (err, foundRoute) => {
            if (err) {
                console.log('cant find route ' + req.params.routeName, err);
                res.sendStatus(404);
            }
            res.json(foundRoute);
        });
    });

    app.post('/api/route/:routeName', checkAuthenticated, (req, res) => {
        const routes = db().routes;
        const user = req.user.username;
        const record = extend(req.body, {
            user: user,
            name: req.params.name
        });

        routes.update({
            name: req.params.routeName
        }, record, {
            upsert: true
        }).then((response) => {
            if (!response.result.ok) {
                console.log('cant add route ' + req.params.routeName);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};
