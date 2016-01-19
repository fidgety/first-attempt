import * as types from '../constants';
import store from '../store';
import { findRoute } from '../actionCreators/planner';
import elevationStats from '../utils/statistics/elevation';
import { calculateDistance } from '../utils/maps/polyline';

const buildFullRoute = (legs) => {
    return legs.reduce((prevLegs, leg) => {
        return prevLegs.concat(leg);
    }, []);
};

const calculateElevationStatistics = (elevationsPerLeg) => {
    let elevations = flattenArray(elevationsPerLeg);
    return elevationStats(elevations);
};

const flattenArray = (array) => {
    return [].concat.apply([], array);
};

export default (state, action) => {
    if (!state) {
        return {
            currentPoint: undefined,
            waypoints: [],
            legs: [],
            route: [],
            routeStarted: false,
            routeSaved: false,
            elevations: [],
            elevationStatistics: {
                uphill: 0,
                downhill: 0,
                flatish: 0
            },
            routeStatistics: {
                distance: 0
            }
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
        const route =buildFullRoute(updatedLegs);
        return Object.assign({}, state, {
            legs: updatedLegs,
            route,
            routeStatistics: {
                distance: calculateDistance(route)
            }
        });
    }

    if (action.type === types.UNDO) {
        const route = buildFullRoute(legs);
        let waypoints = state.waypoints.concat([]);
        let legs = state.legs.concat([]);
        let elevations = state.elevations.concat([]);
        waypoints.pop();
        legs.pop();
        elevations.pop();
        let currentPoint = waypoints[waypoints.length - 1];

        return Object.assign({}, state, {
            currentPoint,
            waypoints,
            legs,
            route,
            routeStarted: waypoints.length !== 0,
            routeSaved: false,
            elevations,
            elevationStatistics: calculateElevationStatistics(elevations),
            routeStatistics: {
                distance: calculateDistance(route)
            }
        });
    }

    if (action.type === types.ELEVATIONS_UPDATED) {
        let elevations = state.elevations.concat([action.elevations]);

        return Object.assign({}, state, {
            elevations: elevations,
            elevationStatistics: calculateElevationStatistics(elevations)
        });
    }

    if (action.type === types.ROUTE_SAVED) {
        return Object.assign({}, state, {
            routeSaved: true
        });
    }

    return state;
};
