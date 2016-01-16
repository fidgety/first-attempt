const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/veloptuous';

let connections = {
    users: {},
    routes: {}
};

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw new Error('can\'t connect to db ' + JSON.stringify(err));
    }
    connections.users = db.collection('users');
    connections.routes = db.collection('routes');
});

module.exports = () => {
    return connections;
};
