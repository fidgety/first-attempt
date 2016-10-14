import React from 'react';
import { Pie } from 'react-chartjs';
var tweenState = require('react-tween-state');

require('./style.scss');

let options = {
    segmentShowStroke: false,
    percentageInnerCutout: 50,
    animationEasing: 'easeOutQuart',
    animationSteps: 40,
    showTooltips: false
};

export default React.createClass({
    mixins: [tweenState.Mixin],
    getInitialState() {
        return {
            distance: 0
        };
    },
    componentWillMount() {
        this.tweenState('distance', {
            duration: 500,
            endValue: Math.floor(this.props.distance / 1000)
        });
    },
    componentWillReceiveProps(nextProps) {
        this.tweenState('distance', {
            duration: 500,
            endValue: Math.floor(nextProps.distance / 1000)
        });
    },
    render() {
        const data = [
            {
                value: this.props.uphill || 1,
                color: '#FF6339',
                highlight: '#FF5A5E',
                label: 'ascending'
            },
            {
                value: this.props.flatish || 1,
                color: '#ffd339',
                highlight: '#FFC870',
                label: 'flat (sort of)'
            },
            {
                value: this.props.downhill || 1,
                color: '#2ecc71',
                highlight: '#5AD3D1',
                label: 'descending'
            }
        ];

        return (<div className="summary-chart">
            <Pie data={data} options={options}/>
            <div className="summary-chart__distance">
                {parseInt(this.getTweeningValue('distance'), 10)}
                <span className="summary-chart__unit">km</span>
            </div>
        </div>);
    }
});
