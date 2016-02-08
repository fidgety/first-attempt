import * as types from '../constants';
import snapToRoute from '../utils/maps/snapToRoute';
import getDirections from '../utils/maps/getDirections';
import routeToLatLngs from '../utils/maps/routeToLatLngs';
import getLatLngsForElevationLookup from '../utils/maps/sampleLatLngsFromRoute';
import getElevationsForLatLngs from '../utils/maps/elevations';

const sampleRate = 1000;

export const latLngSelected = (latLng) => {
    return {
        type: types.LAT_LNG_SELECTED,
        latLng
    };
};

export const latLngLookupStarted = () => {
    return {
        type: types.LAT_LNG_LOOKUP_STARTED
    };
};

export const latLngLookupFinished = () => {
    return {
        type: types.LAT_LNG_LOOKUP_FINISHED
    };
};

export const directionsFound = (latLngs) => {
    return {
        type: types.DIRECTIONS_FOUND,
        latLngs
    };
};

export const undo = () => {
    return {
        type: types.UNDO
    };
};

export const reset = () => {
    return {
        type: types.RESET
    };
};

export const elevationsUpdated = (elevations) => {
    return {
        type: types.ELEVATIONS_UPDATED,
        elevations
    };
};

export const findNearestLatLng = (latLng) => {
    return (dispatch) => {
        // dispatch(latLngLookupStarted());
        snapToRoute(latLng).then((nearestLatLng) => {
            dispatch(latLngSelected(nearestLatLng));
            // dispatch(latLngLookupFinished());
        });
    };
};

export const getElevationsForLeg = (latLngs) => {
    return (dispatch) => {
        let latLngsForLookup = getLatLngsForElevationLookup(latLngs, 0, sampleRate); //eslint-disable-line
        getElevationsForLatLngs(latLngsForLookup).then((elevations) => {
            dispatch(elevationsUpdated(elevations));
        });
    };
};

export const findRoute = (startLatLng, endLatLng, additionalRoute) => {
    return (dispatch) => {
        getDirections(startLatLng, endLatLng).then((route) => {
            let routeLatLngs = routeToLatLngs(route);

            if (additionalRoute) {
                routeLatLngs = routeLatLngs.concat(additionalRoute);
            }

            dispatch(directionsFound(routeLatLngs));
            dispatch(getElevationsForLeg(routeLatLngs));
        });
    };
};
