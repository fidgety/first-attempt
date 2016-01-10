import React from 'react';
require('./style.scss');

export default React.createClass({
    propTypes: {
        loggedIn: React.PropTypes.bool.isRequired,
        username: React.PropTypes.string,
        photo: React.PropTypes.string
    },
    render() {
        return (
            <div className="user">
            {this.props.loggedIn ?
                <div>
                    {this.props.username}<img src={this.props.photo}/>
                </div> :
                <a href="/login/twitter">Log In with Twitter</a>}
            </div>
        );
    }
});
