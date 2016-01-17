import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

let history = createBrowserHistory();
import store from './store';

import Home from './pages/home';
import Planner from './pages/planner';
import RouteOverview from './pages/route';

require('./reset.scss');
require('./style.scss');

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="/planner" component={Planner}/>
            <Route path="/route/:routeName" component={RouteOverview}/>
        </Router>
    </Provider>
), document.getElementById('app'));
