import React from 'react';
require('./style.scss');

export default React.createClass({
    propTypes: {
        onUndo: React.PropTypes.func.isRequired
    },
    render() {
        return <div className="undo" onClick={this.props.onUndo}>undo</div>;
    }
});
