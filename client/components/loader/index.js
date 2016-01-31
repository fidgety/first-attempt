import React from 'react';
require('./style.scss');

export default () => {
    return <div className="loader">
        <div className="loader__container">
            <div className="loader__inner loader__inner1"></div>
            <div className="loader__inner loader__inner2"></div>
            <div className="loader__inner loader__inner3"></div>
            <div className="loader__inner loader__inner4"></div>
            <div className="loader__inner loader__inner5"></div>
        </div>
        <div className="loader__message">loading</div>
    </div>;
};
