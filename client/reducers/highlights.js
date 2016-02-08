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
                    stats: {
                        cost: '£££',
                        quality: '****'
                    },
                    description: 'David Mellor was an industrial designer; you may not have heard of him but if you visit this beautiful complex you\'ll see many examples of everyday objects he crafted. He built this complex to make high end cutlery, which they still do to this day. The cafe has ample seating inside and out and is a wonderful little oasis of culture. There is a good selection of cakes and food, and the staff couldn\'t be nicer.', // eslint-disable-line
                    selected: false
                },
                'The Dale': {
                    location: new google.maps.LatLng(53.339611489775805, -1.6215133666992188), // eslint-disable-line
                    name: 'The Dale',
                    type: 'view',
                    image: '/images/the-dale.jpg',
                    stats: {

                    },
                    description: 'It\'s tougher to find a higher spot you can cycle to in the Peaks. You\'re probably going to be fairly buffeted by the wind, so watch out.', // eslint-disable-line
                    selected: false
                },
                'Gliding Club': {
                    route: [
                        new google.maps.LatLng(53.339611489775805, -1.6215133666992188), // eslint-disable-line
                        new google.maps.LatLng(53.349611489775805, -1.6215133666992188) // eslint-disable-line
                    ],
                    name: 'Gliding Club',
                    type: 'climb',
                    image: '',
                    stats: {

                    },
                    description: '',
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
