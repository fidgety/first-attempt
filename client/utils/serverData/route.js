const LatLng = google.maps.LatLng;

const arrayToLatLng = (array) => {
    return array.map(latLngToGoogleLatLng);
};

const latLngToGoogleLatLng = (latLng) => {
    return new LatLng(latLng);
};

var stateToHydrate = {
    planner: undefined,
    highlights: undefined
};

var prevState = JSON.parse(localStorage.getItem('lastState'));
var routePage = !!veloptuous.route;

if (prevState && !veloptuous.route) {
    veloptuous.route = prevState.planner;
}

if (veloptuous.route) {
    veloptuous.route.route = arrayToLatLng(veloptuous.route.route);
    veloptuous.route.waypoints = arrayToLatLng(veloptuous.route.waypoints);
    veloptuous.route.legs = veloptuous.route.legs.map(arrayToLatLng);
    veloptuous.route.elevations = veloptuous.route.elevations.map((elevation) => {
        return elevation.map((ele) => {
            return Object.assign({}, ele, {
                location: latLngToGoogleLatLng(ele.location)
            });
        });
    });
    veloptuous.route.highlights = veloptuous.route.highlights.map((highlight) => {
        if (highlight && highlight.route) {
            return Object.assign({}, highlight, {
                route: arrayToLatLng(highlight.route)
            });
        }
        if (highlight && highlight.location) {
            return Object.assign({}, highlight, {
                location: latLngToGoogleLatLng(highlight.location)
            });
        }
    });

    stateToHydrate.planner = veloptuous.route;

    if (routePage) {
        var hl = {};
        veloptuous.route.highlights.forEach((highlight) => {
            if (highlight) {
                hl[highlight.name] = highlight;
            }
        });
        stateToHydrate.highlights = {highlights: hl};
    }

}

export default stateToHydrate;
