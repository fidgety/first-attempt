import React from 'react';
require('./style.scss');
import Modal from '../modal';

export default React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool
    },
    render() {
        const modal = (
            <Modal isOpen={this.props.isOpen}>
                <label>Route name<input name="name" ref={
                    (c) => this._input = c}/>
                </label>
                <div>
                    <div className="button save-dialog-button" onClick={() => {
                        this.props.onSave(this._input.value);
                    }}>save</div>
                    <div className="button save-dialog-button" onClick={
                        this.props.onClose
                    }>cancel</div>
                </div>
            </Modal>
        );
        return modal;
    }
});
