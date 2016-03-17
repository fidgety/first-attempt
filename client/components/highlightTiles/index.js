import React from 'react';

require('./style.scss');

export default React.createClass({
    propTypes: {
        highlights: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {}
    },
    render() {
        const highlights = Object.keys(this.props.highlights).map((highlightName) => {
            const highlight = this.props.highlights[highlightName];
            return <div
                className="highlight-tile"
                key={highlight.name}
            >
                <div className="highlight-tile__name">{highlight.name}</div>
                <img src={highlight.image}/>
            </div>
        });

        return <div className="highlight-tiles">
            {highlights}
        </div>;
    }
});
