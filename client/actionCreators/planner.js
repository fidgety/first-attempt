import * as types from '../constants/map';
import snapToRoute from '../utils/maps/snapToRoute';
import getDirections from '../utils/maps/getDirections';
import routeToLatLngs from '../utils/maps/routeToLatLngs';

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

export const findNearestLatLng = (latLng) => {
    return (dispatch) => {
        // dispatch(latLngLookupStarted());
        snapToRoute(latLng).then((nearestLatLng) => {
            dispatch(latLngSelected(nearestLatLng));
            // dispatch(latLngLookupFinished());
        });
    };
};

export const findRoute = (startLatLng, endLatLng) => {
    return (dispatch) => {
        getDirections(startLatLng, endLatLng).then((route) => {
            dispatch(directionsFound(routeToLatLngs(route)));
        });
    };
};
