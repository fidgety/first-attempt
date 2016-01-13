import * as types from '../constants/map';
import store from '../store';
import { findRoute } from '../actionCreators/planner';

export default (state, action) => {
    if (!state) {
        return {
            currentPoint: undefined,
            waypoints: [],
            legs: []
        };
    }

    if (action.type === types.LAT_LNG_SELECTED) {
        if (state.waypoints.length) {
            let endOfCurrentRoute = state.waypoints[state.waypoints.length - 1];
            store.dispatch(findRoute(endOfCurrentRoute, action.latLng));
        }
        return Object.assign({}, state, {
            currentPoint: action.latLng,
            waypoints: state.waypoints.concat([action.latLng])
        });
    }

    if (action.type === types.DIRECTIONS_FOUND) {
        return Object.assign({}, state, {
            legs: state.legs.concat([action.latLngs])
        });
    }

    return state;
};
