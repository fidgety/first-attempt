const db = require('./db');

function buildUserObject(user) {
    return {
        username: user.username,
        displayName: user.displayName,
        img: user.photos[0].value,
        type: 'twitter'
    };
}

function add(user) {
    let users = db().users;
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
