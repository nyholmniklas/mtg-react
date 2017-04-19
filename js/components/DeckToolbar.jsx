import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

export default class DeckToolbar extends React.Component {
    render() {
        return (
            <Button.Group labeled fluid>
                <Button compact icon='sort' content='Sort' onClick={this.props.sortDeck}/>
                <Button compact icon='download' content='Download' onClick={this.props.downloadDeck}/>
            </Button.Group>
        );
    }
}

DeckToolbar.propTypes = {
    sortDeck: PropTypes.func.isRequired,
    downloadDeck: PropTypes.func.isRequired
};