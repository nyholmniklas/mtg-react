import React from 'react';

export default class ExportButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>Export Deck</button>
        );
    }
}

ExportButton.propTypes = {
    onClick: React.PropTypes.func
};