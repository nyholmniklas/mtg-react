import React from 'react';
import Card from './Card.jsx';

export default class Cards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <div>
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

Cards.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func.isRequired
};