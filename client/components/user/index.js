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
                <div><span className="user__username">{this.props.username}</span> <img src={this.props.photo}/></div> :
                <a href="/login/twitter">Log in<span className="user__register"> / Register</span></a>}
            </div>
        );
    }
});
