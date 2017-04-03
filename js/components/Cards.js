import React from 'react'
import Card from './Card.js'

class Cards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <div className={this.props.className}>
                <ul className="cards">
                    {
                        this.props.cards.map(function (card) {
                            return (<li key={card.id}>
                                <Card card={card} cardClickedCallback={cardClickedCallback}/>
                            </li>);
                        })}
                </ul>
            </div>
        );
    }
}

export default Cards;