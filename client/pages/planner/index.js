import React from 'react';
import PlannerMap from '../../components/maps/planner';
import { connect } from 'react-redux';
import { findNearestLatLng } from '../../actionCreators/planner';

const select = (state) => {
    return {
        currentPoint: state.currentPoint
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <PlannerMap
                currentPoint={this.props.currentPoint}
                onLatLngSelected={(latLng) =>
                    this.props.dispatch(findNearestLatLng(latLng))}
            />
        );
    }
}));
