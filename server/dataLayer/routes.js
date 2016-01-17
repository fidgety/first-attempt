const db = require('../dataLayer/db');
const extend = require('extend');

const get = (routeName) => {
    return new Promise((resolve, reject) => {
        const routes = db().routes;

        routes.findOne({
            name: routeName
        }, (err, foundRoute) => {
            if (err) {
                reject(err);
            }
            resolve(foundRoute);
        });
    });
};

const save = (routeName, record) => {
    const routes = db().routes;
    extend(record, {
        name: routeName
    });

    return routes.update({
        name: routeName
    }, record, {
        upsert: true
    });
};

module.exports = {
    get: get,
    save: save
};
