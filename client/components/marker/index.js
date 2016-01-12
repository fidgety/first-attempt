import { createClass } from 'react';

import customMarker from '../../utils/maps/customMarker';

export default createClass({
    getInitialState() {
        return {};
    },
    shouldComponentUpdate(nextProps) {
        if (!nextProps.latLng) {
            return false;
        }

        if (!this.props.latLng && nextProps.latLng) {
            return true;
        }

        return nextProps.latLng.toString() !== this.props.latLng.toString();
    },
    componentWillReceiveProps(nextProps) {
    },
    componentWillUnmount() {
        this.state.marker.setMap(null);
    },
    render() {
        this.state.marker = customMarker(
            this.props.latLng,
            this.props.map,
            this.props.classPrefix,
            this.props.tooltopDiv,
            this.props.onclick
        );
        return null;
    }
});
