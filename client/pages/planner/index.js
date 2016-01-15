import React from 'react';
import PlannerMap from '../../components/maps/planner';
import Undo from '../../components/undo';
import { connect } from 'react-redux';
import { findNearestLatLng, undo } from '../../actionCreators/planner';

const select = (state) => {
    return {
        waypoints: state.waypoints,
        route: state.route
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div className="full-screen">
                <PlannerMap
                    waypoints={this.props.waypoints}
                    route={this.props.route}
                    onLatLngSelected={(latLng) =>
                        this.props.dispatch(findNearestLatLng(latLng))}
                />
                <Undo onUndo={() => {
                    console.log('clicky');
                    this.props.dispatch(undo());
                }}/>
            </div>
        );
    }
}));
