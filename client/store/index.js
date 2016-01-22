import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import planner from '../reducers/planner';
import highlights from '../reducers/highlights';
import serverStore from '../utils/serverData/route';

const reducers = combineReducers({
    planner,
    highlights
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers, serverStore);

export default store;
