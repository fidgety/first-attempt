import * as types from '../constants';
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
            legs: [],
            route: [],
            routeStarted: false,
            routeSaved: false
        };
    }

    if (action.type === types.LAT_LNG_SELECTED) {
        if (state.waypoints.length) {
            let endOfCurrentRoute = state.waypoints[state.waypoints.length - 1];
            store.dispatch(findRoute(endOfCurrentRoute, action.latLng));
        }

        let waypoints = state.waypoints.concat([action.latLng]);

        return Object.assign({}, state, {
            currentPoint: action.latLng,
            waypoints,
            routeStarted: waypoints.length !== 0,
            routeSaved: false
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
            route: buildFullRoute(legs),
            routeStarted: waypoints.length !== 0,
            routeSaved: false
        });
    }

    if (action.type === types.ROUTE_SAVED) {
        return Object.assign({}, state, {
            routeSaved: true
        });
    }

    return state;
};
