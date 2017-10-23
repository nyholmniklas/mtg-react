import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export default class ExportButton extends React.Component {
    render() {
        return <Button onClick={this.props.onClick}>Export Deck</Button>;
    }
}

ExportButton.propTypes = {
    onClick: PropTypes.func
};
