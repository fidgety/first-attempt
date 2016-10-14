import * as types from '../constants';

export default (state, action) => {
    if (!state) {
        return {
            highlights: {
                'Cutlery Factory': {
                    location: new google.maps.LatLng(53.32454221338231, -1.6524338722229004), // eslint-disable-line
                    name: 'Cutlery Factory',
                    type: 'café',
                    image: '/images/cutlery-factory-1.jpg',
                    selected: false
                },
                'The Dale': {
                    location: new google.maps.LatLng(53.339611489775805, -1.6215133666992188), // eslint-disable-line
                    name: 'The Dale',
                    type: 'view',
                    image: '/images/the-dale.jpg',
                    selected: false
                }
            },
            selectedHighlight: undefined
        };
    }

    if (action.type === types.HIGHLIGHT_SELECTED) {
        return Object.assign({}, state, {
            selectedHighlight: state.highlights[action.name],
            highlights: Object.assign({}, state.highlights, {
                [action.name]: Object.assign({},
                    state.highlights[action.name], {
                        selected: true
                    })
            })
        });
    }

    if (action.type === types.HIGHLIGHT_CLOSED) {
        const highlights = {};
        Object.keys(state.highlights).forEach((key) => {
            highlights[key] = Object.assign({}, state.highlights[key], {
                selected: false
            });
        });

        return Object.assign({}, state, {
            selectedHighlight: undefined,
            highlights: highlights
        });
    }

    return state;
};
