const directionsService = new google.maps.DirectionsService();

export default (startLatLng, endLatLng) => {
    var request = {
        origin: startLatLng,
        destination: endLatLng,
        travelMode: google.maps.DirectionsTravelMode.BICYCLING
    };

    return new Promise((resolve, reject) => {
        directionsService.route(request, (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                return resolve(response.routes[0]);
            }
            reject('bad response from directions service ' + response + status);
            console.log('bad response from directions service', response, status);
        });
    });
}
