import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import Card from '~/components/Card.jsx';

export default class Cards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardClickedCallback = this.props.cardClickedCallback;
        return (
            <Grid centered className="card-grid">
                {this.props.cards.map(function(card) {
                    return (
                        <Grid.Column
                            width={4}
                            key={card.orderNumber}
                            className="cardColumn"
                        >
                            <Card
                                card={card}
                                cardClickedCallback={cardClickedCallback}
                            />
                        </Grid.Column>
                    );
                })}
            </Grid>
        );
    }
}

Cards.propTypes = {
    cards: PropTypes.array.isRequired,
    cardClickedCallback: PropTypes.func.isRequired
};
