import React from 'react';
import PlannerMap from '../../components/maps/planner';
import TopBar from '../../components/topbar';
import PlannerControls from '../../components/plannerControls';
import Summary from '../../components/statistics/summary';
import HighlightSummary from '../../components/highlightSummary';

import { connect } from 'react-redux';
import { findNearestLatLng, undo } from '../../actionCreators/planner';
import { saveRoute } from '../../actionCreators/save';
import { highlightSelected, highlightClosed } from '../../actionCreators/highlights';

const select = (state) => {
    return {
        waypoints: state.planner.waypoints,
        route: state.planner.route,
        routeStarted: state.planner.routeStarted,
        routeSaved: state.planner.routeSaved,
        elevationStatistics: state.planner.elevationStatistics,
        routeStatistics: state.planner.routeStatistics,
        highlights: state.highlights.highlights,
        selectedHighlight: state.highlights.selectedHighlight
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
                    uphill={this.props.elevationStatistics.uphill}
                    downhill={this.props.elevationStatistics.downhill}
                    flatish={this.props.elevationStatistics.flatish}
                    distance={this.props.routeStatistics.distance}
                />
                <HighlightSummary
                    selectedHighlight={this.props.selectedHighlight}
                    onHighlightClosed={() => {
                        this.props.dispatch(highlightClosed())
                    }}
                    onHighlightAdded={() => {alert('add');}}
                />
                <PlannerMap
                    waypoints={this.props.waypoints}
                    route={this.props.route}
                    highlights={this.props.highlights}
                    onHighlightSelected={(name) => {
                        this.props.dispatch(highlightSelected(name))
                    }}
                    onLatLngSelected={(latLng) =>
                        this.props.dispatch(findNearestLatLng(latLng))}
                />
            </div>
        );
    }
}));
