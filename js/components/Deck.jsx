import React from 'react';
import Cards from './Cards.jsx';

export default class Deck extends React.Component {
    render() {
        return (
            <div className="four wide column deck">
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        );
    }
}

Deck.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func
};