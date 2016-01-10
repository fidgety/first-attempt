const express = require('express');
const app = express();
const authentication = require('./passport');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
    name: 'veloptuous-user',
    secret: 'ssssshhhhhhh',
    resave: false,
    saveUninitialized: true
}));

authentication(app);

app.get('/', (req, res) => {
    let viewModel = {
        loggedIn: false
    };

    if (req.user) {
        viewModel = {
            username: req.user.displayName,
            photo: req.user.photos[0].value,
            loggedIn: true
        };
    }

    res.render('home', viewModel);
});

app.get('/login', (req, res) => {
    res.send('welcome');
});

app.listen('3000', () => {
    console.log('server ready and listening on port 3000');
});
