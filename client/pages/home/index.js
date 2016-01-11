import React from 'react';
import User from '../../components/user';
import Blurb from '../../components/blurb';

export default React.createClass({
    render() {
        return <div>
            <User
                loggedIn={veloptuous.user.loggedIn}
                username={veloptuous.user.username}
                photo={veloptuous.user.photo}
            />
            <div className="clearfix"/>
            <Blurb/>
        </div>;
    }
});
