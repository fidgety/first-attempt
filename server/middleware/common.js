const rememberLastUrlForPassportRedirect = (req, res, next) => {
    req.session.returnTo = req.url; //eslint-disable-line
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

    res.locals.clientData = { //eslint-disable-line
        user: JSON.stringify(userInformation)
    };

    next();
};

module.exports = [
    userDetails,
    rememberLastUrlForPassportRedirect
];
