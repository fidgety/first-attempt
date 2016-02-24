import React from 'react';
import PlannerControl from '../plannerControl';
import Modal from 'react-modal';

require('./style.scss');

export default React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired
    },
    render() {
        return <Modal isOpen={this.props.isOpen}>
            {this.props.children}
        </Modal>;
    }
});
