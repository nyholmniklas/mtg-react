import React from 'react';
import EditableDeckList from './EditableDeckList.jsx';

export default class Deck extends React.Component {
    render() {
        return (
            <EditableDeckList deck={this.props.deck}/>
        );
    }
}

Deck.propTypes = {
    deck: React.PropTypes.object.isRequired
};