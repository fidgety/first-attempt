import React from 'react';
import PlannerControl from '../plannerControl';
import { undo } from '../../actionCreators/planner';

require('./style.scss');

export default React.createClass({
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
