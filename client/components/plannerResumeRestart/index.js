import React from 'react';
import PlannerControl from '../plannerControl';

require('./style.scss');

export default React.createClass({
    propTypes: {},
    getInitialState() {
        return {
            firstTime: true
        }
    },
    close() {
        this.setState({
            firstTime: false
        });
    },
    componentWillReceiveProps() {
        this.close();
    },
    render() {
        if (this.state.firstTime === false || this.state.firstTime && !this.props.routeStarted) {
            return null;
        }

        return <div className="planner-resume-reset">
            <div className="planner-resume-reset__question-holder">
                <div className="planner-resume-reset__question">Hey! do you want to carry on with the last route, or start again?</div>
                <div className="button" onClick={this.props.onReset}>reset</div>
                <div className="button" onClick={this.close}>resume</div>
            </div>
        </div>;
    }
});
