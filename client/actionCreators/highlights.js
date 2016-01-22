import * as types from '../constants';

export const highlightSelected = (name) => {
    return {
        type: types.HIGHLIGHT_SELECTED,
        name
    };
};

export const highlightClosed = () => {
    return {
        type: types.HIGHLIGHT_CLOSED
    };
};
