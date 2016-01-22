import React from 'react';
import mainMapOptions from '../mainMapOptions';
import Marker from '../../marker';
import Polyline from '../../polyline';

require('./style.scss');

let lookupInProgress = false;

module.exports = React.createClass({
    propTypes: {
        onLatLngSelected: React.PropTypes.func,
        waypoints: React.PropTypes.array,
        route: React.PropTypes.array
    },
    getInitialState() {
        return {
            map: undefined
        };
    },
    componentDidMount() {
        let map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mainMapOptions
        );
        this.setState({
            map
        });

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
        const map = this.state.map;

        const markers = this.props.waypoints.map((waypoint) => {
            return <Marker
                latLng={waypoint}
                map={map}
                classPrefix="waypoint"
                key={waypoint.toString()}
            />
        });

        const highlights = Object.keys(this.props.highlights).map((highlightName) => {
            const highlight = this.props.highlights[highlightName];

            return <Marker
                latLng={highlight.location}
                map={map}
                classPrefix="highlight"
                key={highlight.location + map}
                onclick={() => {
                    this.props.onHighlightSelected(highlight.name);
                }}
            />
        });

        return (
            <div id="map">
                <div id="map-canvas"></div>
                {markers}
                {highlights}
                <Polyline
                    map={map}
                    polyline={this.props.route}
                />
            </div>);
    }
});
