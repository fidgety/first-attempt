const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    layoutsDir: __dirname + '/../views/layouts',
    partialsDir: __dirname + '/../views/partials',
    defaultLayout: 'main'
});

module.exports = (app) => {
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/../views');

    app.use(express.static('public'));

    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('body-parser').json({ limit: '50mb' }));
    app.use(require('express-session')({
        name: 'veloptuous-user',
        secret: 'ssssshhhhhhh',
        resave: false,
        saveUninitialized: true
    }));
};
