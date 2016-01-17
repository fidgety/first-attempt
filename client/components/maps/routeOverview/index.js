import React from 'react';
import mainMapOptions from '../mainMapOptions';
import Polyline from '../../polyline';
import { toBounds } from '../../../utils/maps/polyline';

require('./style.scss');

module.exports = React.createClass({
    propTypes: {
        route: React.PropTypes.array.isRequired
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
        let bounds = toBounds(this.props.route);

        map.fitBounds(bounds);
    },
    render() {
        let map = this.state.map;

        return (
            <div id="map">
                <div id="map-canvas"></div>
                <Polyline
                    map={map}
                    polyline={this.props.route}
                />
            </div>);
    }
});
