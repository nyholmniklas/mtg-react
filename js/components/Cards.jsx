import React from 'react';
import Card from './Card.jsx';
import { Grid } from 'semantic-ui-react';

export default class Cards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <Grid centered container>
                {
                    this.props.cards.map(function (card) {
                        return (<Grid.Column width={4} key={card.id} className="cardColumn">
                            <Card card={card} cardClickedCallback={cardClickedCallback}/>
                        </Grid.Column>);
                    })}
            </Grid>
        );
    }
}

Cards.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func.isRequired
};