let encodePath = google.maps.geometry.encoding.encodePath;
let decodePath = google.maps.geometry.encoding.decodePath;
let calcDistance = google.maps.geometry.spherical.computeLength;
let gBound = google.maps.LatLngBounds;

export const join = (polyline, polyline2) => {
    if (!polyline || !polyline2) {
        return;
    }

    let mainPathArray = polyline.getPath();
    const pathToMerge = polyline2.getPath().getArray();

    pathToMerge.forEach(point => {
        mainPathArray.push(point);
    });

    return polyline;
};

export const encode = (polyline) => {
    return encodePath(polyline.getPath());
};

export const decode = (encodedPath) => {
    return decodePath(encodedPath);
};

export const calculateDistance = calcDistance;

export const toBounds = (latLngs) => {
    if (latLngs) {
        let bounds = new gBound();
        latLngs.forEach(latLng => bounds.extend(latLng));

        return bounds;
    }
};
