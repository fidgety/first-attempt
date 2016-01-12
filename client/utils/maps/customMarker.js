module.exports = function(latLng, map, classPrefix, tooltipDiv, onclick) {
    //var bounds = new google.maps.LatLng(lat, lng);

    return new CustomOverlay(latLng, map, classPrefix, tooltipDiv, onclick || function () {});
};

CustomOverlay.prototype = new google.maps.OverlayView();

function CustomOverlay(bounds, map, classPrefix, tooltipDiv, onclick) {
    this.highlighted = false;
    this.latLng = bounds;
    this.markerClass = classPrefix + '-marker';
    this.tooltipClass = classPrefix + '-tooltip';
    this.onclick = onclick;

    this.markerDiv = document.createElement('div');
    this.markerDiv.className = this.markerClass;

    if (tooltipDiv) {
        this.tooltipDiv = tooltipDiv;
        this.tooltipDiv.className = this.tooltipClass;
    }

    this.setMap(map);
}

CustomOverlay.prototype.onAdd = function () {
    var that = this;

    this.markerDiv.onclick = function () {
        that.onclick(that.highlighted);
        return false;
    };

    this.markerDiv.onmouseout = function () {
        //that.hoverEvent();
    };

    var panes = this.getPanes();

    if (this.tooltipDiv) {
        panes.floatPane.appendChild(this.tooltipDiv);
    }
    panes.floatPane.appendChild(this.markerDiv);
};

CustomOverlay.prototype.onHighlighted = function () {
    this.highlighted = true;
    if (this.markerDiv) {
        this.markerDiv.className = this.markerClass + ' ' + this.markerClass + '-highlighted';
    }

    if (this.tooltipDiv) {
        this.tooltipDiv.className =  this.tooltipClass + ' ' + this.tooltipClass + '-highlighted';
    }
};

CustomOverlay.prototype.offHighlighted = function () {
    this.highlighted = false;
    if (this.markerDiv) {
        this.markerDiv.className = this.markerClass;
    }

    if (this.tooltipDiv) {
        this.tooltipDiv.className =  this.tooltipClass;
    }
};

CustomOverlay.prototype.positionDivOnMap = function(div, sw) {
    var width = div.offsetWidth;
    var height = div.offsetHeight;

    div.style.left = (sw.x - (width / 2)) + 'px';
    div.style.top = (sw.y - height) + 'px';
};

CustomOverlay.prototype.draw = function () {
    if (this.latLng) {
        var overlayProjection = this.getProjection();

        var sw = overlayProjection.fromLatLngToDivPixel(this.latLng);

        this.positionDivOnMap(this.markerDiv, sw);
        if (this.tooltipDiv) {
            this.tooltipDiv.style.display = 'block';
            this.positionDivOnMap(this.tooltipDiv, sw);
            this.tooltipDiv.style.display = '';
        }
    }
    else {
        this.markerDiv.style.display = 'none';
    }
};

CustomOverlay.prototype.onRemove = function () {
    this.markerDiv.parentNode.removeChild(this.markerDiv);
    this.markerDiv = null;

    if (this.tooltipDiv) {
        this.tooltipDiv.parentNode.removeChild(this.tooltipDiv);
        this.tooltipDiv = null;
    }
};

