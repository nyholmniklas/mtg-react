import React from 'react';
import { Grid } from 'semantic-ui-react';

import Card from '~/components/Card.jsx';

export default class Cards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <Grid centered className="searchResults">
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