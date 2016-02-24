import React from 'react';
import PlannerControl from '../plannerControl';
import Modal from 'react-modal';

require('./style.scss');

export default React.createClass({
    propTypes: {
        onUndo: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        routeStarted: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return {
            showLoginMessage: false
        }
    },
    closeModal() {
        this.setState({
            showLoginMessage: false
        });
    },
    render() {
        const onSave = () => {
            if (this.props.loggedIn) {
                return this.props.onSave();
            }

            this.setState({
                showLoginMessage: true
            });
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
            <Modal
                isOpen={this.state.showLoginMessage}
            >
                <h2>Please login/register to save</h2>
                <p>Don't worry - your progress so far will be here when you get back!</p>
                <div className="button" onClick={this.closeModal}>ok</div>
            </Modal>
        </div>;
    }
});
