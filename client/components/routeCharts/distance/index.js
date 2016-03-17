import React from 'react';
var tweenState = require('react-tween-state');

require('./style.scss');

export default React.createClass({
    mixins: [tweenState.Mixin],
    getInitialState() {
        return {
            value: 0
        }
    },
    componentWillMount() {
        this.tweenState('value', {
            duration: 2000,
            endValue: parseFloat(this.props.value)
        });
    },
    componentWillReceiveProps(nextProps) {
        this.tweenState('value', {
            duration: 500,
            endValue: nextProps.value
        });
    },
    render() {
        return <div className="route-chart-distance">
            {parseFloat(this.getTweeningValue('value')).toFixed(1)}
            <span className="route-chart-distance__unit">km</span>
            <div className="route-chart-distance__title">{this.props.title}</div>
        </div>
    }
});
