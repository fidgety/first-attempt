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
                    onClick={() => {
                        this.props.onHighlightSelected(highlightName)
                    }}
                    strokeColour="#CC2029"
                />
            }
            return <Marker
                map={this.props.map}
                highlight={highlight}
                key={highlightName}
                onHighlightSelected={this.props.onHighlightSelected}
            />
        });

        return <div>{highlightMarkers}</div>;
    }
});