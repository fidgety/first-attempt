import React from 'react';

require('./style.scss');

export default React.createClass({
    propTypes: {
        message: React.PropTypes.element,
        key: React.PropTypes.string
    },
    getInitialState() {
        return {
            closed: false
        };
    },
    close() {
        this.setState({
            closed: true
        });
        setTimeout(() => {
            localStorage.setItem('toolTip-' + this.props.id, 'shown');
        }, 500);
    },
    render() {
        const className = 'tool-tip' + (this.state.closed ? ' tool-tip--closed' : '');


        if (localStorage.getItem('toolTip-' + this.props.id) === 'shown') {
            return null
        }

        return <div className={className}>
            <div className="tool-top__info">{this.props.message}</div>
            <div className="tool-tip__ok" onClick={this.close}>ok</div>
        </div>;
    }
});
