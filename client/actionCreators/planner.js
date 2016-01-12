import * as types from '../constants/map';
import snapToRoute from '../utils/maps/snapToRoute';

export const latLngSelected = (latLng) => {
    return {
        type: types.LAT_LNG_SELECTED,
        latLng
    };
};

export const findNearestLatLng = (latLng) => {
    return (dispatch) => {
        // dispatch(lookupStarted)
        snapToRoute(latLng).then((nearestLatLng) =>
            dispatch(latLngSelected(nearestLatLng))
        );
    };
};
