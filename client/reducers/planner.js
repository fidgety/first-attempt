import * as types from '../constants/map';

export default (state, action) => {
    if (!state) {
        return {
            currentPoint: undefined,
            waypoints: []
        };
    }

    if (action.type === types.LAT_LNG_SELECTED) {
        return Object.assign({}, state, {
            currentPoint: action.latLng,
            waypoints: state.waypoints.concat([action.latLng])
        });
    }

    return state;
};
