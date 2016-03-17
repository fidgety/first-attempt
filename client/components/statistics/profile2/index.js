import React from 'react';
import { Line } from 'react-chartjs';

require('./style.scss');

let options = {
    segmentShowStroke: false,
    percentageInnerCutout: 50,
    animationEasing: 'easeOutQuart',
    animationSteps: 40
};

export default React.createClass({
    render() {
        const elevations = this.props.elevationStatistics.elevations;

        const options = {
            showScale: false,
            scaleShowGridLines: false,
            pointDot: false,
            responsive: true,
            maintainAspectRatio: false,
            datasetStrokeWidth: 1,
            showTooltips: true,
            customTooltips: function (tooltip) {
                console.log(tooltip);
            }
        };

        const data = {
            labels: elevations,
            datasets: [
                {
                    fillColor: 'rgba(0,0,0,0.2)',
                    strokeColor: 'white',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: elevations
                }
            ]
        };

        return (<div className="profile-chart2">
            <Line data={data} options={options}/>
        </div>);
    }
});
