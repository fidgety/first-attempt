const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/veloptuous';

let users;

MongoClient.connect(url, function(err, db) {
    users = db.collection('users');
});

function buildUserObject(user) {
    return {
        username: user.username,
        displayName: user.displayName,
        img: user.photos[0].value,
        type: 'twitter'
    };
}
function add(user) {
    users.findOne({
        username: user.username
    }, (err, foundUser) => {
        if (!foundUser) {
            users.insertOne(buildUserObject(user), (errInsert) => {
                if (errInsert) {
                    console.log('error inserting user into db', user);
                }
            });
        }
    });
}

module.exports = {
    add
};
