import React from 'react';
import EditableDeckList from './EditableDeckList.jsx';

export default class Deck extends React.Component {
    render() {
        return (
            <EditableDeckList deckListTextChanged={this.props.deckListTextChanged}/>
        );
    }
}

Deck.propTypes = {
    deckListTextChanged: React.PropTypes.func.isRequired
};