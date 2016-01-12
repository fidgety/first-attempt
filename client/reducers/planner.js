import * as types from '../constants/map';

export default (state, action) => {
    if (!state) {
        return {
            currentPoint: undefined
        };
    }

    if (action.type === types.MAP_CLICKED) {
        return Object.assign({}, state, {
            currentPoint: action.latLng
        });
    }

    return state;
};
