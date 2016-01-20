import React from 'react';
import Logo from '../logo';
import ColourBar from '../colourBar'

require('./style.scss');

export default React.createClass({
    render() {
        return <div>
            <div className="logo">
                <Logo/>
                <ColourBar/>
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
