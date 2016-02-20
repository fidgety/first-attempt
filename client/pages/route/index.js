import React from 'react';
import RouteOverview from '../../components/maps/routeOverview';
import TopBar from '../../components/topbar';
import { highlightSelected } from '../../actionCreators/highlights';

import { connect } from 'react-redux';

require('./style.scss');

const select = (state) => {
    return {
        route: state.planner.route,
        name: state.planner.name,
        highlights: state.highlights.highlights
    };
};

export default connect(select)(React.createClass({
    render() {

        const highlights = Object.keys(this.props.highlights).map((highlightName) => {
            const highlight = this.props.highlights[highlightName];
            return <div
                className="route-highlight"
                key={highlight.name}
            >
                <div className="route-highlight__name">{highlight.name}</div>
                <img src={highlight.image}/>
            </div>
        });

        return (
            <div>
                <TopBar/>
                <section className="route-content">
                    <div className="title">On the cusp of the White Peak</div>
                    <div className="natural-english-summary">
                        A route with <span className="highlights">3 highlights</span>, which should take you about <span className="time">3.2 hours</span>.
                        There is <span className="cafe">1 café stop</span>, which you'll need - there <span className="climb">2,300 feet</span> of climbing!
                    </div>
                    <div className="description">
                        The Peak District is made up of two very different sections - the White and Dark Peaks. One soft light limestone, the other brooding morrlands of millstone grit.
                    </div>

                    {highlights}
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
