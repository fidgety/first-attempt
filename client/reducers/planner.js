import * as types from '../constants';
import store from '../store';
import { findRoute } from '../actionCreators/planner';
import elevationStats from '../utils/statistics/elevation';
import { calculateDistance } from '../utils/maps/polyline';

const flattenArray = (array) => {
    return [].concat.apply([], array);
};

const buildFullRoute = (legs) => {
    return legs.reduce((prevLegs, leg) => {
        return prevLegs.concat(leg);
    }, []);
};

const calculateElevationStatistics = (elevationsPerLeg) => {
    let elevations = flattenArray(elevationsPerLeg);
    return elevationStats(elevations);
};

const addWaypointOrHighlight = (state, waypoint, highlight) => {
    const latLng = waypoint || highlight.location;

    if (state.waypoints.length) {
        let endOfCurrentRoute = state.waypoints[state.waypoints.length - 1];
        store.dispatch(findRoute(endOfCurrentRoute, latLng));
    }

    let waypoints = state.waypoints.concat([latLng]);
    let highlights = state.highlights.concat([highlight]);

    return Object.assign({}, state, {
        currentPoint: latLng,
        waypoints,
        highlights,
        routeStarted: waypoints.length !== 0,
        routeSaved: false
    });
};

export default (state, action) => {
    if (!state) {
        return {
            currentPoint: undefined,
            waypoints: [],
            legs: [],
            route: [],
            highlights: [],
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
        return addWaypointOrHighlight(state, action.latLng);
    }

    if (action.type === types.HIGHLIGHT_ADDED) {
        return addWaypointOrHighlight(state, undefined, action.highlight);
    }

    if (action.type === types.DIRECTIONS_FOUND) {
        let updatedLegs = state.legs.concat([action.latLngs]);
        const route = buildFullRoute(updatedLegs);
        return Object.assign({}, state, {
            legs: updatedLegs,
            route,
            routeStatistics: {
                distance: calculateDistance(route)
            }
        });
    }

    if (action.type === types.UNDO) {
        let waypoints = state.waypoints.concat([]);
        let legs = state.legs.concat([]);
        let elevations = state.elevations.concat([]);
        let highlights = state.elevations.concat([]);
        waypoints.pop();
        legs.pop();
        elevations.pop();
        highlights.pop();
        const route = buildFullRoute(legs);
        let currentPoint = waypoints[waypoints.length - 1];

        return Object.assign({}, state, {
            currentPoint,
            waypoints,
            highlights,
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
