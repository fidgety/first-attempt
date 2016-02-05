import React from 'react';
import Marker from '../marker';

require('./style.scss');

export default React.createClass({
    propTypes: {
        waypoints: React.PropTypes.array.isRequired,
        map: React.PropTypes.object
    },
    render() {
        return this.props.waypoints.length ? <Marker
            latLng={this.props.waypoints[0]}
            map={this.props.map}
            markerDiv={<div className="start-marker"></div>}
            onClick={() => {
                alert('clicky - what should this do?');
                return false;
            }}
        /> : null;
    }
});
