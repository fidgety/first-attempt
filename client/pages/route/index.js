import React from 'react';
import RouteOverview from '../../components/maps/routeOverview';
import TopBar from '../../components/topbar';
import { highlightSelected } from '../../actionCreators/highlights';

import { connect } from 'react-redux';

const select = (state) => {
    return {
        route: state.planner.route,
        highlights: state.highlights.highlights
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div className="full-screen">
                <TopBar/>
                <RouteOverview
                    route={this.props.route}
                    highlights={this.props.highlights}
                    onHighlightSelected={(name) => {
                        this.props.dispatch(highlightSelected(name))
                    }}
                />
            </div>
        );
    }
}));
