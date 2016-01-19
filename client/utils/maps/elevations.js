const elevationsService = new google.maps.ElevationService();

export default (samplePoints) => {
    return new Promise((resolve, reject) => {
        elevationsService.getElevationForLocations({
            locations: samplePoints
        }, (results, status) => {
            if (status === google.maps.ElevationStatus.OK) {
                return resolve(results);
            }

            console.log('bad response from elevations service', samplePoints, results, status);
            reject('bad response from elevations service');
        });
    });
};
