import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Icon } from 'semantic-ui-react';

import Cards from '~/components/Cards.jsx';

export default class SearchResults extends React.Component {
    render() {
        let showResults =
            this.props.cards !== undefined && this.props.cards.length > 0;
        return (
            <Container>
                {showResults ? (
                    <Cards
                        cards={this.props.cards}
                        cardClickedCallback={this.props.cardClickedCallback}
                    />
                ) : (
                    <Message compact icon className="noCardsDialog">
                        <Icon name="chevron left" />
                        <Message.Content>
                            <Message.Header>Welcome to Owlbrew!</Message.Header>

                            <p>
                                Start exploring cards by using the search form.
                            </p>
                        </Message.Content>
                    </Message>
                )}
            </Container>
        );
    }
}

SearchResults.propTypes = {
    cards: PropTypes.array.isRequired,
    cardClickedCallback: PropTypes.func
};
