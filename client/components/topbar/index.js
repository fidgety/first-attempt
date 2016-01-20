import React from 'react';
import Logo from '../logo';
import User from '../user';
import ColourBar from '../colourBar'

require('./style.scss');

export default React.createClass({
    render() {
        return <div>
            <div className="top-bar">
                <div className="top-bar__logo">
                    <Logo/>
                </div>
                <div className="top-bar__user">
                    <User
                        loggedIn={veloptuous.user.loggedIn}
                        username={veloptuous.user.username}
                        photo={veloptuous.user.photo}
                    />
                </div>
            </div>
            <div className="top-bar__colours">
                <ColourBar/>
            </div>
        </div>;
    }
});
