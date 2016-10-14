import React from 'react';
import PlannerControl from '../plannerControl';

require('./style.scss');

export default React.createClass({
    propTypes: {
        onUndo: React.PropTypes.func.isRequired,
        routeStarted: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return {
            showLoginMessage: false
        };
    },
    closeModal() {
        this.setState({
            showLoginMessage: false
        });
    },
    render() {
        return <div className="planner-controls">
            <div className="planner-controls__undo">
                <PlannerControl
                    onClick={this.props.onUndo}
                    text="undo"
                    enabled={this.props.routeStarted}
                />
            </div>
        </div>;
    }
});
