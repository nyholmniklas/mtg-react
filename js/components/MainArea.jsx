import React from 'react';
import SearchForm from '~/components/SearchBar.jsx';
import SearchResults from './../components/SearchResults.jsx';
import CardActions from './../Actions.js';
import { Grid } from 'semantic-ui-react';

export default class MainArea extends React.Component {
    render() {
        let searchVisible = (this.props.mainAreaContent === 'search');
        let statsVisible = (this.props.mainAreaContent === 'stats');

        return (
            <Grid className='mainArea'>
                <Grid.Column width={3}>
                    <SearchForm searchCards={this.props.searchCards} searchParams={this.props.searchParams} deck={this.props.deck}
                                downloadDeckCallback={CardActions.downloadDeck} visible={searchVisible}/>
                </Grid.Column>
                <Grid.Column width={13}>
                    <SearchResults ref="searchResults" cards={this.props.cardSearchResults}
                                   cardClickedCallback={CardActions.addCardToDeck} visible={statsVisible}/>
                </Grid.Column>
            </Grid >
        );
    }
}

MainArea.propTypes = {
    mainAreaContent: React.PropTypes.string.isRequired,
    searchCards: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    cardSearchResults: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.object.isRequired
};