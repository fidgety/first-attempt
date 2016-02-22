import React from 'react';
import Logo from '../logo';
import User from '../user';
import ColourBar from '../colourBar'

require('./style.scss');

export default React.createClass({
    render() {
        return <div className="top-bar">
                <div className="top-bar__logo">
                    <Logo/>
                </div>
                <div className="top-bar__user">
                    <User
                        loggedIn={this.props.loggedIn}
                        username={this.props.username}
                        photo={this.props.photo}
                    />
                </div>
            <div className="top-bar__colours">
                <ColourBar/>
            </div>
        </div>;
    }
});
