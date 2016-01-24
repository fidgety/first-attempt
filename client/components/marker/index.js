import { createClass } from 'react';
import React from 'react';
import ReactDOM from 'react-dom'

import customMarker from '../../utils/maps/customMarker';

export default createClass({
    getInitialState() {
        let markerDiv = document.createElement('div');
        markerDiv.style.position = 'absolute';
        markerDiv.className = 'marker';
        markerDiv.addEventListener('click', function (e) {
            e.stopPropagation();
            return false;
        });
        return {
            markerDiv
        };
    },
    shouldComponentUpdate(nextProps) {
        //if (!nextProps.latLng) {
        //    return false;
        //}
        //
        //if (!this.props.latLng && nextProps.latLng) {
        //    return true;
        //}
        //
        //return nextProps.latLng.toString() !== this.props.latLng.toString();
        return true;
    },
    componentWillReceiveProps(nextProps) {
    },
    componentWillUnmount() {
        this.state.marker.setMap(null);
    },
    componentDidMount(){
        ReactDOM.render(this.props.markerDiv, this.state.markerDiv)
    },
    componentDidUpdate() {
        ReactDOM.render(this.props.markerDiv, this.state.markerDiv)

    },
    render() {
        this.state.markerDiv.onclick = this.props.onClick;
        this.state.marker = customMarker(
            this.props.latLng,
            this.props.map,
            this.state.markerDiv
        );
        return null;
    }
});
