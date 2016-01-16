const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/veloptuous';

module.exports = function (app) {
    app.get('/api/route/:routeName', function (req, res) {
        MongoClient.connect(url, function(err, db) {
            let routes = db.collection('routes');

            routes.findOne({
                name: req.params.routeName
            }, (findErr, foundRoute) => {
                if (findErr) {
                    console.log('cant find route ' + req.params.routeName);
                    res.sendStatus(404);
                }
                res.json(foundRoute);
            });
        });
    });

    app.post('/api/route/:routeName', function (req, res) {
        MongoClient.connect(url, function(err, db) {
            let routes = db.collection('routes');

            routes.insertOne({
                name: req.params.routeName
            }, (insertErr) => {
                if (insertErr) {
                    console.log('cant add route ' + req.params.routeName);
                    res.sendStatus(500);
                }
                res.sendStatus(200);
            });
        });
    });
};
