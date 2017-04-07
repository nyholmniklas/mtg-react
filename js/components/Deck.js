import React from 'react';
import Cards from './Cards.js';

export default class Deck extends React.Component {
    render() {
        return (
            <div className="deck">
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        )
    }
}

Deck.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func
}