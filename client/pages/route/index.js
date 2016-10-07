import React from 'react';
import RouteOverview from '../../components/maps/routeOverview';
import TopBar from '../../components/topbar';
import Profile from '../../components/statistics/profile2';
import HighlightTiles from '../../components/highlightTiles';
import RouteSplash from '../../components/routeSplash';
import RouteCharts from '../../components/routeCharts';
import { highlightSelected } from '../../actionCreators/highlights';

import { connect } from 'react-redux';

require('./style.scss');

const select = (state) => {
    return {
        route: state.planner.route,
        name: state.planner.name,
        highlights: state.highlights.highlights,
        elevationStatistics: state.planner.elevationStatistics,
        routeStatistics: state.planner.routeStatistics
    };
};

export default connect(select)(React.createClass({
    render() {
        return (
            <div>
                <TopBar
                    loggedIn={veloptuous.user.loggedIn}
                    username={veloptuous.user.username}
                    photo={veloptuous.user.photo}
                />
                <section className="route-content">
                    <section className="header">
                        <RouteSplash
                            img="/images/gliding-club.jpg"
                            title={this.props.name}
                        />
                        <RouteCharts
                            routeStatistics={this.props.routeStatistics}
                            elevationStatistics={this.props.elevationStatistics}
                        />
                        <Profile
                            elevationStatistics={this.props.elevationStatistics}
                        />
                    </section>
                    <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis, quam et dictum facilisis, sapien dui luctus metus, ac rhoncus arcu ante id sem. Quisque facilisis a dolor non blandit. Integer blandit pharetra dignissim. Ut nec libero metus. Phasellus dignissim, metus accumsan ullamcorper blandit, ipsum ex te
                    </div>
                    <HighlightTiles
                        highlights={this.props.highlights}
                    />
                    <div className="map-holder">
                        <RouteOverview
                            route={this.props.route}
                            highlights={this.props.highlights}
                            onHighlightSelected={(name) => {
                                this.props.dispatch(highlightSelected(name))
                            }}
                        />
                    </div>
                </section>
            </div>
        );
    }
}));
