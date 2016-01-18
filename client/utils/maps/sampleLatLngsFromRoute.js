export default (latLngs, offset = 0, sampleRate = 1000) => {
    var i = 0;
    var samplepoints = [];
    var s = google.maps.geometry.spherical;
    var startOffset = offset % sampleRate || 0;

    for (; i < latLngs.length - 1; i++) {
        var length = s.computeLength([latLngs[i], latLngs[i + 1]]),
            heading = s.computeHeading(latLngs[i], latLngs[i + 1]),
            chunk = sampleRate - startOffset;

        while (length > chunk) {
            var samplepoint = s.computeOffset(latLngs[i], chunk, heading);
            samplepoints.push(samplepoint);
            chunk += sampleRate;
        }

        startOffset = (startOffset + length) % sampleRate;
    }

    return samplepoints;
}
