import * as types from '../constants';
import store from '../store';

export const routeSaved = () => {
    return {
        type: types.ROUTE_SAVED
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
            body: JSON.stringify(store.getState())
        }).then((response) => {
            if (response.status === 200) {
                dispatch(routeSaved());
            } else {
                console.log('error saving route',
                    response.statusText, response);
            }
        }).catch((err) => {
            console.log('error saving route', err);
        });
    };
};
