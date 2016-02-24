import React from 'react';
import PlannerControl from '../plannerControl';
import Modal from '../modal';

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
        const isOpen = this.state.firstTime === true && this.props.routeStarted;

        return <Modal isOpen={isOpen}>
            <p>Hey! do you want to carry on with the last route, or start again?</p>
            <div className="button" onClick={this.props.onReset}>reset</div>
            <div className="button" onClick={this.close}>resume</div>
        </Modal>;
    }
});
