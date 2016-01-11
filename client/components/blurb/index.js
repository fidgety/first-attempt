import React from 'react';
import Logo from '../logo';

require('./style.scss');

export default React.createClass({
    render() {
        return <div>
            <div className="logo">
                <Logo/>
            </div>
            <div className="tag-line">Cycling, made more pleasurable</div>
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
