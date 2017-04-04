import React from 'react'
import Cards from './Cards.js'

class Deck extends React.Component {
    render() {
        return (
            <div className="deck">
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        )
    }
}

export default Deck;