import * as types from '../constants';
import store from '../store';

export const routeSaved = () => {
    return {
        type: types.ROUTE_SAVED
    };
};

export const updateRouteDetails = (name) => {
    return {
        type: types.ROUTE_DETAILS_UPDATED,
        name
    };
};

export const saveRoute = (routeName) => {
    return (dispatch) => {

        fetch('/api/route/' + routeName, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(store.getState().planner)
        }).then((response) => {
            if (response.status === 200) {
                dispatch(routeSaved(routeName));
            } else {
                console.log('error saving route',
                    response.statusText, response);
            }
        }).catch((err) => {
            console.log('error saving route', err);
        });
    };
};
