import React from 'react';
import Marker from '../marker';

require('./style.scss');

export default React.createClass({
    render() {
        const highlightMarkers = Object.keys(this.props.highlights).map((highlightName) => {
            const highlight = this.props.highlights[highlightName];
            const className = highlight.selected ? 'highlight-marker selected' : 'highlight-marker';
            const map = this.props.map;

            return <Marker
                latLng={highlight.location}
                map={map}
                markerDiv={<div className={className}><div className="add highlight-marker__button">+</div><div className="close highlight-marker__button">-</div></div>}
                key={highlight.location + map}
                onClick={() => {
                    this.props.onHighlightSelected(highlight.name);
                    return false;
                }}
            />
        });

        return <div>{highlightMarkers}</div>;
    }
});