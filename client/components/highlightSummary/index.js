import React from 'react';
import StatsTable from './statsTable';

require('./style.scss');

export default React.createClass({
    propTypes: {
        selectedHighlight: React.PropTypes.object
    },
    getInitialState() {
        return {
            highlight: {
                stats: {}
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedHighlight) {
            this.setState({
                highlight: nextProps.selectedHighlight
            })
        }
    },
    render() {
        const highlight = this.state.highlight;
        const classes = this.props.selectedHighlight ? 'modal' : 'modal modal_hidden';


        return <div className={classes}>
            <div className="highlight-sidebar">
                <div className="holder">
                    <img className="highlight-sidebar__image" src={highlight.image}/>
                    <div className="highlight-sidebar__main-info">
                        <h2>{highlight.name}</h2>
                        <h3>{highlight.type}</h3>
                    </div>
                </div>
                <div className="highlight-sidebar__controls">
                    <div onClick={this.props.onHighlightAdded} className="highlight-button add">+</div>
                    <div onClick={this.props.onHighlightClosed} className="highlight-button close">-</div>
                </div>
                <div className="highlight-sidebar__info">
                    <StatsTable stats={highlight.stats}/>
                </div>
                <div className="highlight-sidebar__text">{highlight.description}</div>
            </div>
        </div>;
    }
});
