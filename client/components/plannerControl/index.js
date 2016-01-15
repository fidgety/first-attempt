import React from 'react';
require('./style.scss');

export default React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired,
        enabled: React.PropTypes.bool.isRequired
    },
    render() {
        let className = 'planner-control ' + (this.props.enabled ? '' : 'disabled');
        return <div className={className} onClick={this.props.onClick}>{this.props.text}</div>;
    }
});
