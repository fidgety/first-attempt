const LatLng = google.maps.LatLng;

const arrayToLatLng = (array) => {
    return array.map(latLngToGoogleLatLng);
};

const latLngToGoogleLatLng = (latLng) => {
    return new LatLng(latLng);
};

var prevState = JSON.parse(localStorage.getItem('lastState'));

if (prevState && !veloptuous.route) {
    veloptuous.route = prevState;
}

if (veloptuous.route) {
    veloptuous.route.planner.route = arrayToLatLng(veloptuous.route.planner.route);
    veloptuous.route.planner.waypoints = arrayToLatLng(veloptuous.route.planner.waypoints);
    veloptuous.route.planner.legs = veloptuous.route.planner.legs.map(arrayToLatLng);
    veloptuous.route.planner.elevations = veloptuous.route.planner.elevations.map((elevation) => {
        return elevation.map((ele) => {
            return Object.assign({}, ele, {
                location: latLngToGoogleLatLng(ele.location)
            });
        });
    });
    veloptuous.route.planner.highlights = veloptuous.route.planner.highlights.map((highlight) => {
        if (highlight) {
            return Object.assign({}, highlight, {
                location: latLngToGoogleLatLng(highlight.location)
            });
        }
    });

    veloptuous.route.highlights = undefined;
}

export default veloptuous.route;
