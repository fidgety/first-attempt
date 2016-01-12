import React from 'react';
import PlannerMap from '../../components/maps/planner';
import { connect } from 'react-redux';
import { findNearestLatLng } from '../../actionCreators/planner';

const select = (state) => {
    return {
        waypoints: state.waypoints
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <PlannerMap
                waypoints={this.props.waypoints}
                onLatLngSelected={(latLng) =>
                    this.props.dispatch(findNearestLatLng(latLng))}
            />
        );
    }
}));
