import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import SearchForm from '~/components/SearchBar.jsx';
import CardActions from '~/Actions.js';
import SearchResults from '~/components/SearchResults.jsx';
import VisualDeck from '~/components/VisualDeck.jsx';

export default class MainArea extends React.Component {
    render() {
        let searchVisible = this.props.mainAreaContent === 'search';
        //let statsVisible = (this.props.mainAreaContent === 'stats');
        let visualDeckVisible = this.props.mainAreaContent === 'visual-deck';

        return (
            <Grid className="mainArea">
                {searchVisible ? (
                    <Grid.Column width={3}>
                        <SearchForm
                            searchCards={this.props.searchCards}
                            searchParams={this.props.searchParams}
                            deck={this.props.deck}
                        />
                    </Grid.Column>
                ) : null}
                {searchVisible ? (
                    <Grid.Column width={13}>
                        <SearchResults
                            cards={this.props.cardSearchResults}
                            cardClickedCallback={CardActions.addCardToDeck}
                        />
                    </Grid.Column>
                ) : null}
                {visualDeckVisible ? (
                    <Grid.Column width={16}>
                        <VisualDeck
                            cards={this.props.deck.cards}
                            cardClickedCallback={() => {}}
                        />
                    </Grid.Column>
                ) : null}
            </Grid>
        );
    }
}

MainArea.propTypes = {
    mainAreaContent: PropTypes.string.isRequired,
    searchCards: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired,
    cardSearchResults: PropTypes.array.isRequired,
    searchParams: PropTypes.object.isRequired
};
