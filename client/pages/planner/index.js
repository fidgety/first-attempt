import React from 'react';
import PlannerMap from '../../components/maps/planner';
import TopBar from '../../components/topbar';
import PlannerControls from '../../components/plannerControls';
import Summary from '../../components/statistics/summary';

import { connect } from 'react-redux';
import { findNearestLatLng, undo } from '../../actionCreators/planner';
import { saveRoute } from '../../actionCreators/save';

const select = (state) => {
    return {
        waypoints: state.waypoints,
        route: state.route,
        routeStarted: state.routeStarted,
        routeSaved: state.routeSaved,
        statistics: state.elevationStatistics
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div className="full-screen">
                <TopBar/>
                <PlannerControls
                    onUndo={() => this.props.dispatch(undo())}
                    onSave={() => {
                        let routeName = window.prompt('Please give your route a name');
                        this.props.dispatch(saveRoute(routeName));
                    }}
                    routeSaved={this.props.routeSaved}
                    routeStarted={this.props.routeStarted}
                />
                <Summary
                    uphill={this.props.statistics.uphill}
                    downhill={this.props.statistics.downhill}
                    flatish={this.props.statistics.flatish}
                />
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
