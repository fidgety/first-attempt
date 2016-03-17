import React from 'react';

require('./style.scss');

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        img: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div className="route-splash">
            <img src={this.props.img}/>
            <div className="route-splash__title">
            {this.props.title}
            </div>
        </div>;
    }
});
