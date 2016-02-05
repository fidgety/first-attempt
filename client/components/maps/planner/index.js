import React from 'react';
import mainMapOptions from '../mainMapOptions';
import Polyline from '../../polyline';
import HighlightMarkers from '../../highlightMarkers';
import StartMarker from '../../startMarker';
import ToolTip from '../../toolTips';

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
                // console.log(e.latLng.toString())
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

        return (
            <div id="map">
                <div id="map-canvas"></div>
                <ToolTip
                    id="welcome"
                    message={<div><p>Click anywhere on the map to start a route.</p><p>Or click a pin too see more info about a highlight.</p></div>}
                />
                <StartMarker
                    map={map}
                    waypoints={this.props.waypoints}
                />
                <HighlightMarkers
                    map={map}
                    onHighlightSelected={this.props.onHighlightSelected}
                    highlights={this.props.highlights}
                />
                <Polyline
                    map={map}
                    polyline={this.props.route}
                />
            </div>);
    }
});
