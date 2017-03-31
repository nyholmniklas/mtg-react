import React from 'react'
import Cards from './Cards.js'

class Deck extends React.Component {
    render() {
        return (
            <div className="deck">
                <span><h1>Deck</h1></span>
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        )
    }
}

export default Deck;