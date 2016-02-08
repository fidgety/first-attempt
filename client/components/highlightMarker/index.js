import React from 'react';
import Marker from '../marker';

require('./style.scss');

export default React.createClass({
    render() {
        const highlight = this.props.highlight;
        const className = 'highlight-marker ' + highlight.type + (highlight.selected ? ' selected' : '');
        const map = this.props.map;

        return <Marker
            latLng={highlight.location}
            map={map}
            markerDiv={<div className={className}></div>}
            key={highlight.location + map}
            onClick={() => {
                this.props.onHighlightSelected(highlight.name);
                return false;
            }}
        />
    }
});