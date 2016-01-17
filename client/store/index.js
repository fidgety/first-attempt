import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import planner from '../reducers/planner';
import serverStore from '../utils/serverData/route';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
)(createStore);
const store = createStoreWithMiddleware(planner, serverStore);

export default store;
