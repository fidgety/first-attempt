export default (elevations, sampleDistance = 1000) => {
    var stats = {
        ascending: 0,
        descending: 0,
        flatish: 0,
        uphill: 0,
        downhill: 0
    };

    if (elevations.length === 0) {
        return stats;
    }

    elevations
        .map((elevation) => elevation.elevation)
        .reduce((prevValue, currentValue) => {
            var heightDifferential = prevValue - currentValue;
            var heightDifferentialAbs = Math.abs(heightDifferential);

            if (heightDifferentialAbs < 5) {
                stats.flatish += sampleDistance;
            } else if (heightDifferential > 0) {
                stats.descending += heightDifferentialAbs;
                stats.downhill += sampleDistance;
            } else {
                stats.ascending += heightDifferentialAbs;
                stats.uphill += sampleDistance;
            }
            return currentValue;
        });

    return stats;
};
