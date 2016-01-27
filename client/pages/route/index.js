import React from 'react';
import RouteOverview from '../../components/maps/routeOverview';
import TopBar from '../../components/topbar';

import { connect } from 'react-redux';

const select = (state) => {
    return {
        route: state.planner.route
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div className="full-screen">
                <TopBar/>
                <RouteOverview
                    route={this.props.route}
                />
            </div>
        );
    }
}));
