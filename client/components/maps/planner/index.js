import React from 'react';
import mainMapOptions from '../mainMapOptions';
import Marker from '../../marker';

require('./style.scss');

let lookupInProgress = false;
let map;

module.exports = React.createClass({
    propTypes: {
        onLatLngSelected: React.PropTypes.func,
        waypoints: React.PropTypes.array
    },
    getInitialState() {
        return {
            map: undefined
        };
    },
    componentDidMount() {
        map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mainMapOptions
        );
        let timer;
        let onLatLngSelected = this.props.onLatLngSelected;

        google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
            google.maps.event.addListener(map, 'dragend', () => {
            });

            google.maps.event.addListener(map, 'click', (e) => {
                if (!timer && !lookupInProgress) {
                    timer = setTimeout(function () {
                        // lookupInProgress = true;

                        onLatLngSelected(e.latLng);

                        timer = undefined;
                    }, 200);
                }
            });

            google.maps.event.addListener(map, 'dblclick', () => {
                clearTimeout(timer);
                timer = undefined;
            });

            google.maps.event.addListener(map, 'zoom_changed', () => {
            });
        });
    },
    render() {
        let markers = this.props.waypoints.map((waypoint) => {
            return <Marker
                latLng={waypoint}
                map={map}
                classPrefix="waypoint"
                key={waypoint.toString()}
            />
        });
        return (
            <div id="map">
                <div id="map-canvas"></div>
                {markers}
            </div>);
    }
});
