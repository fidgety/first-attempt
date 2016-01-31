import React from 'react';

require('./style.scss');

const resetState = {
    imageSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    loaded: false
};

export default React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        className: React.PropTypes.string
    },
    getInitialState() {
        return Object.assign({
            className: ''
        }, resetState);
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.src) {
            this.setState(resetState);

            let downloadingImage = new Image();
            downloadingImage.onload = () => {
                setTimeout(() => {
                    this.setState({
                        imageSrc: nextProps.src,
                        loaded: true
                    })
                }, 1000);
            };
            downloadingImage.src = nextProps.src;

        }
    },
    render() {
        const className = this.props.className +
            (this.state.loaded ? ' image-loader image-loader__loaded' : ' image-loader');
        return <img className={className} src={this.state.imageSrc}/>;
    }
});
