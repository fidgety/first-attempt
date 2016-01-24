module.exports = function (latLng, map, tooltipDiv) {
    return new CustomOverlay(latLng, map, tooltipDiv);
};

CustomOverlay.prototype = new google.maps.OverlayView();

function CustomOverlay(bounds, map, tooltipDiv) {
    this.latLng = bounds;
    this.tooltipDiv = tooltipDiv;

    this.setMap(map);
}

CustomOverlay.prototype.onAdd = function () {
    var panes = this.getPanes();

    panes.floatPane.appendChild(this.tooltipDiv);
};

CustomOverlay.prototype.positionDivOnMap = function (div, sw) {
    var width = div.offsetWidth;
    var height = div.offsetHeight;

    div.style.left = (sw.x - (width / 2)) + 'px';
    div.style.top = (sw.y - height) + 'px';
};

CustomOverlay.prototype.draw = function () {
    if (this.latLng) {
        var overlayProjection = this.getProjection();

        var sw = overlayProjection.fromLatLngToDivPixel(this.latLng);

        this.positionDivOnMap(this.tooltipDiv, sw);
    }
};

CustomOverlay.prototype.onRemove = function () {
    this.tooltipDiv.parentNode.removeChild(this.tooltipDiv);
    this.tooltipDiv = null;
};

