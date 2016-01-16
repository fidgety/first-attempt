const express = require('express');
const app = express();
const authentication = require('./passport');
const api = require('./api');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({
    name: 'veloptuous-user',
    secret: 'ssssshhhhhhh',
    resave: false,
    saveUninitialized: true
}));

authentication(app);
api(app);

const rememberLastUrlForPassportRedirect = (req, res, next) => {
    req.session.returnTo = req.url;
    next();
};

app.get('*', rememberLastUrlForPassportRedirect, (req, res) => {
    let dataToProvide = {
        loggedIn: false
    };

    if (req.user) {
        dataToProvide = {
            username: req.user.displayName,
            photo: req.user.photos[0].value,
            loggedIn: true
        };
    }

    res.render('home', {
        json: JSON.stringify(dataToProvide)
    });
});

app.get('/login', (req, res) => {
    res.send('welcome');
});

app.listen('3004', () => {
    console.log('server ready and listening on port 3000');
});
