import React from 'react';

export default React.createClass({
    propTypes: {
        stats: React.PropTypes.object.isRequired
    },
    render() {
        return <table>
            <tbody>
            {Object.keys(this.props.stats).map((key) => {
                return <tr key={key}>
                    <td className="key">{key}</td>
                    <td className="value">{this.props.stats[key]}</td>
                </tr>;
            })}
            </tbody>
        </table>
    }
});
