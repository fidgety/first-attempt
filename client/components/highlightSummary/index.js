import React from 'react';

require('./style.scss');

export default React.createClass({
    render() {
        return <div className="modal hidden">
            <div className="highlight-sidebar">
                <div className="holder">
                    <img className="highlight-sidebar__image" src="/images/cutlery-factory-1.jpg"/>
                    <div className="highlight-sidebar__main-info">
                        <h2>Cutlery Factory</h2>
                        <h3>Café</h3>
                    </div>
                </div>
                <div className="highlight-sidebar__controls">
                    <div className="highlight-button add">+</div>
                    <div className="highlight-button close">-</div>
                </div>
                <div className="highlight-sidebar__info">
                    <span className="key">cost</span>
                    <span>£££</span>
                </div>
                <div className="highlight-sidebar__text">David Mellor was an industrial designer, you may not have heard of him but if you visit this beautiful complex you'll see many examples of everyday objects he crafted. He built this complex to make high end cutlery, which they still do to this day. The cafe has ample seating inside and out and is a wonderful little oasis of culture. There is a good selection of cakes and food, and the staff couldn't be nicer.</div>
            </div>
        </div>;
    }
});
