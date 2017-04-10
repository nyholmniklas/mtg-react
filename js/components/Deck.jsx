import React from 'react';
import EditableDeckList from './EditableDeckList.jsx';

export default class Deck extends React.Component {
    render() {
        return (
            <EditableDeckList deckListAsText={this.props.deckListAsText} deckListTextChanged={this.props.deckListTextChanged}/>
        );
    }
}

Deck.propTypes = {
    deckListAsText: React.PropTypes.string,
    deckListTextChanged: React.PropTypes.func.isRequired
};