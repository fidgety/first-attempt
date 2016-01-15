import React from 'react';
import PlannerMap from '../../components/maps/planner';
import TopBar from '../../components/topbar';
import PlannerControls from '../../components/plannerControls';

import { connect } from 'react-redux';
import { findNearestLatLng } from '../../actionCreators/planner';

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
                <TopBar/>
                <PlannerControls/>
                <PlannerMap
                    waypoints={this.props.waypoints}
                    route={this.props.route}
                    onLatLngSelected={(latLng) =>
                        this.props.dispatch(findNearestLatLng(latLng))}
                />
            </div>
        );
    }
}));
