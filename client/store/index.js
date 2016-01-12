import { createStore } from 'redux';
import planner from '../reducers/planner';

const store = createStore(planner);

store.subscribe(() => {
    console.log('storeUpdated', store.getState());
});

export default store;
