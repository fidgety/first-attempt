import React from 'react';
import { toBounds } from '../../utils/maps/polyline';

module.exports = React.createClass({
    propTypes: {
        polyline: React.PropTypes.array,
        map: React.PropTypes.object,
        strokeColour: React.PropTypes.string,
        strokeWeight: React.PropTypes.number
    },
    getInitialState() {
        return {
            polyline: new google.maps.Polyline({
                path: [],
                strokeColor: '#FF6633',
                strokeWeight: 4,
                map: this.props.map
            })
        };
    },
    shouldComponentUpdate(nextProps) {
        this.state.polyline.setMap(nextProps.map);
        this.state.polyline.setOptions({
            strokeColor:nextProps.strokeColour || '#00ff00',
            strokeWeight:nextProps.strokeWeight || 4
        });

        google.maps.event.addListener(this.state.polyline, 'click', (e) => {
            alert('clicked the polyline');
        });

        return nextProps.polyline !== undefined
            && this.state.polyline.getPath().getLength() !== nextProps.polyline.length;
    },
    componentDidMount() {
    },
    componentWillUnmount() {
        this.state.polyline.setMap(null);
    },
    render() {
        if (this.props.polyline) {
            var newPath = this.props.polyline;
            var route = this.state.polyline.getPath();
            route.clear(); // probably should grow the existing one

            newPath.forEach((latLng, count) => {
                //setTimeout(function () {
                route.push(newPath[count]);
                //}, count * 50);
            });

            if (this.props.fitToMap) {
                // probably not a concern of this file
                this.props.map.fitBounds(toBounds(this.state.polyline));
            }
        }
        return null;
    }
});
