import * as types from '../constants';
import { decode } from '../utils/maps/polyline';

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
                    route: decode('cemdIfiaIJ^FTDNHh@JvAPpBHfANtAZjC@P?J?F?F?@ABAFCREt@InCIjDKfDAl@EfAEt@G`AWlCWvCGn@Ix@S`BWrBK`ACRIl@KjAIv@ETEv@?T@RBXBTJ^Pl@HZLd@ZjAXjARr@Lj@Ph@Nb@\\~@HVBL@L@P@P?RAXAVGlAS`DEt@Cr@?jAB~@FdAFv@Fd@H^JZNZZn@d@`ADJ\\z@d@~@hBzCJNb@n@vAnBf@|@Xl@`BfDjAnCBFpAxDXl@BFFHJNl@p@nAtA\\\\`@j@tArBXb@Tb@L\\Pl@FXHd@BZBXBZ?b@@d@?z@@|@CjACv@Ez@C\\Y`DIlACj@@X@P?HBJHj@VpAh@jCHd@Ft@@N?T@`@@b@@rBAp@Ex@Cf@Gh@Oz@Kd@_@lAs@lBwAdDo@nA_BbDmA|BQ^Wr@]`AWhAKn@Iz@Cv@ExACr@GvAAvAAf@@h@@fAHhAH`APpARnAPlAHx@Dv@DzA@|AAj@Cb@Cr@?P@p@B^JdATzBVdBZhBd@xCJd@Nd@\\p@r@jAdA|AXh@n@`An@bAR`@JVb@lALh@Lf@BLBHDHBHDFFDLFPDNDFBFDHJFNFVBT@V@r@@d@?d@Bd@BZBHBJFNFJFHHJ`@Zr@\\^T\\Tb@`@vAnBfCrClCrCx@~@??lCvCzA|AtAvAXX??PEH?fCRdCTpAFl@Jp@Rd@NVNn@^ZTd@\\\\\\d@h@RTPVZd@DDD@B?D?DEFIBCDAH?HDDDHHFFFL@H@H?H@N?N@RARAVEj@Gr@Gb@KxAIr@S|@ETA\\Ct@A^@b@@t@FzAA\\BjABrFCfCA\\ANERGZOf@Wl@q@zA?BAH?F?JBJBHDBHDHB^RPLHLLRPXBFJf@L`A^~Bf@tEH|@JfC??G@'), // eslint-disable-line
                    name: 'Gliding Club',
                    type: 'climb',
                    image: '/images/gliding-club.jpg',
                    stats: {

                    },
                    description: 'It\'s a long, and I\'ll be honest - it\'s not the easiest, but hell it\'s rewarding! Start just off the A6187 near Hathersage cutlery factory (where hopefully you had a good stop). It\'s a very quiet road so enjoy some side-by-side riding as you rise out of the Hope Valley and head to the tiny hamlet of Abney; you\'ll pass a really interesting hall farm, probably some Buzzards on the way. The landscape slowly shifts from those pleasant lowlands to classic brooding moorland by the end. If you\'re lucky you\'ll see a glider apparently defy gravity and fairly float away - and wait until you get around the corner.', // eslint-disable-line
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
