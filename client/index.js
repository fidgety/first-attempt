import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

import Home from './pages/home';

require('./reset.scss');
require('./style.scss');

ReactDOM.render((
    <Router history={history}>
        <Route path="/" component={Home}>
        </Route>
    </Router>
), document.getElementById('app'));
