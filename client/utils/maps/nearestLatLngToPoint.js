const computeDistanceBetween = google.maps.geometry.spherical.computeDistanceBetween;

export default (start, end1, end2) => {
    const firstDistance = computeDistanceBetween(start, end1);
    const secondDistance = computeDistanceBetween(start, end2);
    return firstDistance < secondDistance ? end1 : end2;
};
