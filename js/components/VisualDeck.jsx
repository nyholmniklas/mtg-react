import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';

import Cards from '~/components/Cards.jsx';

export default class SearchResults extends React.Component {
    render() {
        let showResults = this.props.cards !== undefined && this.props.cards.length > 0;
        return (
            <div>
                {showResults ?
                    <Cards cards={this.props.cards}
                           cardClickedCallback={this.props.cardClickedCallback}/>
                    :
                    <Message compact icon className="noCardsDialog">
                        <Icon name='chevron right'/>
                        <Message.Content>
                            <Message.Header>You have no cards in your deck...</Message.Header>

                            <p>Add cards to your decklist in the editor to see them in the visual deck view.</p>
                        </Message.Content>
                    </Message>
                }
            </div>
        );
    }
}

SearchResults.propTypes = {
    cards: PropTypes.array.isRequired,
    cardClickedCallback: PropTypes.func
};