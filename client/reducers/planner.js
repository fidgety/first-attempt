import * as types from '../constants';
import store from '../store';
import { findRoute } from '../actionCreators/planner';
import elevationStats from '../utils/statistics/elevation';
import { calculateDistance } from '../utils/maps/polyline';
import nearestLatLng from '../utils/maps/nearestLatLngToPoint';

const defaultState = {
    name: '',
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
        flatish: 0,
        elevations: []
    },
    routeStatistics: {
        distance: 0
    }
};

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

const addLeg = (state, latLngs) => {
    let updatedLegs = state.legs.concat([latLngs]);
    const route = buildFullRoute(updatedLegs);
    return Object.assign({}, state, {
        legs: updatedLegs,
        route,
        routeStatistics: {
            distance: calculateDistance(route)
        }
    });
};

const addHighlightRoute = (state, highlight) => {
    const route = highlight.route.concat([]);
    const start = route[0];
    let end = route[route.length - 1];

    if (state.routeStarted) {
        if (nearestLatLng(state.currentPoint, start, end) === end) {
            route.reverse();
            end = start;
        }

        store.dispatch(findRoute(state.currentPoint, route[0], route));

        return Object.assign({}, state, {
            currentPoint: end,
            waypoints: state.waypoints.concat(end),
            highlights: state.highlights.concat(highlight),
            routeStarted: true,
            routeSaved: false
        });
    }

    return Object.assign({}, state, addLeg(state, route), {
        currentPoint: end,
        waypoints: [start, end],
        highlights: [undefined, highlight],
        routeStarted: true,
        routeSaved: false
    });

};

export default (state, action) => {
    if (!state) {
        return defaultState;
    }

    if (action.type === types.RESET) {
        return defaultState;
    }

    if (action.type === types.LAT_LNG_SELECTED) {
        return addWaypointOrHighlight(state, action.latLng);
    }

    if (action.type === types.HIGHLIGHT_ADDED) {
        if (action.highlight.route) {
            return addHighlightRoute(state, action.highlight);
        }

        return addWaypointOrHighlight(state, undefined, action.highlight);
    }

    if (action.type === types.DIRECTIONS_FOUND) {
        return addLeg(state, action.latLngs);
    }

    if (action.type === types.UNDO) {
        let waypoints = state.waypoints.slice(0, -1);
        let legs = state.legs.slice(0, -1);
        let elevations = state.elevations.slice(0, -1);
        let highlights = state.elevations.slice(0, -1);

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

    if (action.type === types.ROUTE_DETAILS_UPDATED) {
        return Object.assign({}, state, {
            name: action.name
        });
    }

    return state;
};
