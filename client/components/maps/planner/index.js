import React from 'react';
import mainMapOptions from '../mainMapOptions';
import store from '../../../store';
import * as types from '../../../constants/map';

require('./style.scss');

let lookupInProgress = false;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            map: undefined
        };
    },
    componentDidMount: function () {
        let map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mainMapOptions
        );
        let timer;

        this.setState({
            map: map
        });

        google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
            google.maps.event.addListener(map, 'dragend', () => {
            });

            google.maps.event.addListener(map, 'click', (e) => {
                if (!timer && !lookupInProgress) {
                    timer = setTimeout(function () {
                        lookupInProgress = true;

                        store.dispatch({
                            type: types.MAP_CLICKED,
                            latLng: e.latLng
                        });

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
    render: function () {
        return (
            <div id="map">
                <div id="map-canvas"></div>
            </div>);
    }
});
