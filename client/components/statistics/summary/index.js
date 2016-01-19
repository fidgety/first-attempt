import React from 'react';
import { Pie } from 'react-chartjs';

require('./style.scss');

let options = {
    segmentShowStroke: false,
    percentageInnerCutout: 70,
    animationEasing: 'easeOutQuart',
    animationSteps: 40
};

export default React.createClass({
    render() {
        const data = [
            {
                value: this.props.uphill || 1,
                color:'#FF6339',
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
        </div>);
    }
});
