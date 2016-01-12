import getDirections from './getDirections';

export default (latLng) => {
    return getDirections(latLng, latLng).then((route) => {
        return route.legs[0].start_location;
    });
};
