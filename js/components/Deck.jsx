import React from 'react';
import PropTypes from 'prop-types';
import EditableDeckList from '~/components/EditableDeckList.jsx';

export default class Deck extends React.Component {
    render() {
        return (
            <EditableDeckList deckListAsText={this.props.deckListAsText} deckListTextChanged={this.props.deckListTextChanged}/>
        );
    }
}

Deck.propTypes = {
    deckListAsText: PropTypes.string,
    deckListTextChanged: PropTypes.func.isRequired
};