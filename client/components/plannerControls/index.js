import React from 'react';
import PlannerControl from '../plannerControl';

require('./style.scss');

export default React.createClass({
    propTypes: {
        onUndo: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        routeStarted: React.PropTypes.bool.isRequired
    },
    render() {
        const onSave = () => {
            if (this.props.loggedIn) {
                return this.props.onSave();
            }

            alert('please login to save, dont worry, your progress will be saved');
        };

        return <div className="planner-controls">
            <div className="planner-controls__undo">
                <PlannerControl
                    onClick={this.props.onUndo}
                    text="undo"
                    enabled={this.props.routeStarted}
                />
                <PlannerControl
                    onClick={onSave}
                    text="save"
                    enabled={this.props.routeStarted && !this.props.routeSaved}
                />
            </div>
        </div>;
    }
});
