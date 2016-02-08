import React from 'react';
import Marker from '../highlightMarker';

import Polyline from '../polyline';

export default React.createClass({
    render() {
        const highlightMarkers = Object.keys(this.props.highlights).map((highlightName) => {
            const highlight = this.props.highlights[highlightName];

            if (highlight.route) {
                return <Polyline
                    map={this.props.map}
                    polyline={highlight.route}
                    key={highlightName}
                />
            }
            return <Marker
                map={this.props.map}
                highlight={highlight}
                key={highlightName}
            />
        });

        return <div>{highlightMarkers}</div>;
    }
});