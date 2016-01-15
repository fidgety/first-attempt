import * as types from '../constants/map';
import store from '../store';
import { findRoute } from '../actionCreators/planner';

function buildFullRoute(legs) {
    return legs.reduce((prevLegs, leg) => {
        return prevLegs.concat(leg);
    }, []);
}
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
        let updatedLegs = state.legs.concat([action.latLngs]);
        return Object.assign({}, state, {
            legs: updatedLegs,
            route: buildFullRoute(updatedLegs)
        });
    }

    if (action.type === types.UNDO) {
        let waypoints = state.waypoints.concat([]);
        let legs = state.legs.concat([]);
        waypoints.pop();
        legs.pop();
        let currentPoint = waypoints[waypoints.length - 1];

        return Object.assign({}, state, {
            currentPoint,
            waypoints,
            legs,
            route: buildFullRoute(legs)
        });
    }

    return state;
};
