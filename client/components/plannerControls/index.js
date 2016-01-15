import React from 'react';
import Undo from '../undo';
import { undo } from '../../actionCreators/planner';

require('./style.scss');

export default React.createClass({
    render() {
        return <div className="planner-controls">
            <div className="planner-controls__undo">
                <Undo onUndo={() => {
                    this.props.dispatch(undo());
                }}/>
            </div>
        </div>;
    }
});
