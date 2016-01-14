import React from 'react';
import Logo from '../logo';

require('./style.scss');

export default React.createClass({
    render() {
        return <div>
            <div className="logo">
                <Logo/>
                <div className="topbar">
                    <div className="a"></div>
                    <div className="b"></div>
                    <div className="c"></div>
                    <div className="d"></div>
                    <div className="e"></div>
                </div>
            </div>
            <div className="tag-line">A cycling route guide to help you make the most enjoyable rides in the Peak District.</div>
            <a className="button start-route" href="/planner">Start a route</a>
            <ul className="images">
                <li>
                    <img src="images/the-dale.jpg"/>
                </li>
                <li>
                    <img src="images/gliding-club2.jpg"/>
                </li>
                <li>
                    <img src="images/tissington-trail-2.jpg"/>
                </li>

            </ul>
        </div>;
    }
});
