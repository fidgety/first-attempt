import React from 'react';
import PlannerMap from '../../components/maps/planner';
import TopBar from '../../components/topbar';
import PlannerControls from '../../components/plannerControls';
import Summary from '../../components/statistics/summary';
import HighlightSummary from '../../components/highlightSummary';
import Profile from '../../components/statistics/profile';
import PlannerResumeRestart from '../../components/plannerResumeRestart';
import SaveDialog from '../../components/saveDialog';

import { connect } from 'react-redux';
import { findNearestLatLng, undo, reset } from '../../actionCreators/planner';
import { saveRoute, updateRouteDetails, openSaveDialog, closeSaveDialog } from '../../actionCreators/save';
import { highlightSelected, highlightClosed, highlightAdded } from '../../actionCreators/highlights';

import { encode } from '../../utils/maps/polyline';

const select = (state) => {
    localStorage.setItem('lastState', JSON.stringify(state));
    localStorage.setItem('lastRouteEncoded', encode(state.planner.route));
    return {
        waypoints: state.planner.waypoints,
        route: state.planner.route,
        routeStarted: state.planner.routeStarted,
        routeSaved: state.planner.routeSaved,
        elevationStatistics: state.planner.elevationStatistics,
        routeStatistics: state.planner.routeStatistics,
        highlights: state.highlights.highlights,
        selectedHighlight: state.highlights.selectedHighlight,
        saveDialogOpen: state.planner.saveDialogOpen
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div className="full-screen">
                <TopBar
                    loggedIn={veloptuous.user.loggedIn}
                    username={veloptuous.user.username}
                    photo={veloptuous.user.photo}
                />
                <PlannerControls
                    onUndo={() => this.props.dispatch(undo())}
                    onSave={() => {
                        this.props.dispatch(openSaveDialog());
                    }}
                    loggedIn={veloptuous.user.loggedIn}
                    routeSaved={this.props.routeSaved}
                    routeStarted={this.props.routeStarted}
                />
                <PlannerResumeRestart
                    onReset={() => {
                        this.props.dispatch(reset());
                    }}
                    routeStarted={this.props.routeStarted}
                />
                <Summary
                    uphill={this.props.elevationStatistics.uphill}
                    downhill={this.props.elevationStatistics.downhill}
                    flatish={this.props.elevationStatistics.flatish}
                    distance={this.props.routeStatistics.distance}
                />
                <Profile
                    elevationStatistics={this.props.elevationStatistics}
                />
                <SaveDialog
                    isOpen={this.props.saveDialogOpen}
                    onSave={(name) => {
                        this.props.dispatch(saveRoute(name));
                    }}
                    onClose={() => {
                        this.props.dispatch(closeSaveDialog());
                    }}
                />
                <HighlightSummary
                    selectedHighlight={this.props.selectedHighlight}
                    onHighlightClosed={() => {
                        this.props.dispatch(highlightClosed());
                    }}
                    onHighlightAdded={(highlight) => {
                        this.props.dispatch(highlightAdded(highlight));
                        this.props.dispatch(highlightClosed());
                    }}
                />
                <PlannerMap
                    waypoints={this.props.waypoints}
                    route={this.props.route}
                    highlights={this.props.highlights}
                    onHighlightSelected={(name) => {
                        this.props.dispatch(highlightSelected(name));
                    }}
                    onLatLngSelected={(latLng) =>
                        this.props.dispatch(findNearestLatLng(latLng))}
                />
            </div>
        );
    }
}));
