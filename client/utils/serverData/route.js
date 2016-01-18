const LatLng = google.maps.LatLng;

const arrayToLatLng = (array) => {
    return array.map(latLngToGoogleLatLng);
};

const latLngToGoogleLatLng = (latLng) => {
    return new LatLng(latLng);
};

if (veloptuous.route) {
    veloptuous.route.route = arrayToLatLng(veloptuous.route.route);
    veloptuous.route.waypoints = arrayToLatLng(veloptuous.route.waypoints);
    veloptuous.route.legs = veloptuous.route.legs.map(arrayToLatLng);
    veloptuous.route.elevations = veloptuous.route.elevations.map((elevation) => {
        return Object.assign({}, elevation, {
            location: latLngToGoogleLatLng(elevation.location)
        })
    });
}

export default veloptuous.route;
