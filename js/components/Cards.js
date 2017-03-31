import React from 'react'

class Cards extends React.Component {
    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <div className={this.props.className} scrollTop={this.props.scroll}>
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