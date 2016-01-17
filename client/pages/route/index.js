import React from 'react';

import { connect } from 'react-redux';

const select = (state) => {
    return {
        waypoints: state.waypoints,
        route: state.route,
        routeStarted: state.routeStarted,
        routeSaved: state.routeSaved
    };
};

export default connect(select)(React.createClass({
    render() {
        console.log(this.props)
        return (
            <div className="full-screen">
            route to go here
            </div>
        );
    }
}));
