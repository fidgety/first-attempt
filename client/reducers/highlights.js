import * as
types
from
'../constants';

export default (state, action) => {
    if (!state) {
        return {
            highlights: {
                'Cutlery Factory': {
                    location: new google.maps.LatLng(53.312211176459776, -1.6417694091796875), // eslint-disable-line
                    name: 'Cutlery Factory',
                    type: 'café',
                    image: '/images/cutlery-factory-1.jpg',
                    stats: {
                        cost: '£££',
                        quality: '****'
                    },
                    description: 'David Mellor was an industrial designer; you may not have heard of him but if you visit this beautiful complex you\'ll see many examples of everyday objects he crafted. He built this complex to make high end cutlery, which they still do to this day. The cafe has ample seating inside and out and is a wonderful little oasis of culture. There is a good selection of cakes and food, and the staff couldn\'t be nicer.', // eslint-disable-line
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
