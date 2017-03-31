import React from 'react'
import ReactDOM from 'react-dom'
import CardStore from './store.js'
import CardActions, {getDeck, getCards} from './actions.js'
import Card from './components/Deck.js'
import Cards from './components/Cards.js'
import Deck from './components/Deck.js'
import ExportButton from './components/ExportButton.js'
import ManaColorSelector from './components/ManaColorSelector.js'
import SearchBar from './components/SearchBar.js'
import SearchResults from './components/SearchResults.js'

export const CardController = React.createClass({
    getInitialState: function (store) {
        return {
            deck: getDeck(),
            cards: getCards(),
            searchText: '',
            searchOracleText: '',
            searchSubtypeText: '',
            manaParams: {
                white: false,
                blue: false,
                black: false,
                red: false,
                green: false
            },
            searchResultsScroll: 0
        };
    },
    storeDidChange: function () {
        this.setState({
            deck: CardActions.getDeck(),
            cards: CardActions.getCards(),
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            searchResultsScroll: 0
        });
    },
    handleUserInput: function (searchText) {
        this.setState({
            deck: this.state.deck,
            cards: this.state.cards,
            searchText: searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            searchResultsScroll: this.state.searchResultsScroll
        });
        this.updateCards();
    },
    handleOracleUserInput: function (oracleSearchText) {
        this.setState({
            deck: this.state.deck,
            cards: this.state.cards,
            searchText: this.state.searchText,
            searchOracleText: oracleSearchText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            searchResultsScroll: this.state.searchResultsScroll
        });
        this.updateCards();
    },
    handleSubtypeUserInput: function (subtypeSearchText) {
        this.setState({
            deck: this.state.deck,
            cards: this.state.cards,
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: subtypeSearchText,
            manaParams: this.state.manaParams,
            searchResultsScroll: this.state.searchResultsScroll
        });
        this.updateCards();
    },
    handleManaParamsInput(manaParams){
        this.setState({
            deck: this.state.deck,
            cards: this.state.cards,
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: manaParams,
            searchResultsScroll: this.state.searchResultsScroll
        });
        this.updateCards();
    },
    onSearchResultsScroll(scroll) {
        this.setState({
            deck: this.state.deck,
            cards: this.state.cards,
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            searchResultsScroll: scroll
        });
    },
    updateCards: function () {
        CardActions.updateCards(this.state.searchText, this.state.searchOracleText, this.state.searchSubtypeText, this.state.manaParams);
    },
    addCardToDeck(card) {
        CardActions.addCardToDeck(card);
    },
    removeCardfromDeck(card) {
        CardActions.removeCardfromDeck(card);
    },
    render: function () {
        return (
            <div className="app">
                <SearchResults ref="searchResults" cards={this.state.cards} cardClickedCallback={this.addCardToDeck}
                               scroll={this.state.searchResultsScroll} onScroll={this.onSearchResultsScroll}/>
                <Deck cards={this.state.deck.cards} cardClickedCallback={this.removeCardfromDeck}/>
                <SearchBar deck={this.state.deck} searchText={this.state.searchText}
                           searchOracleText={this.state.searchOracleText}
                           searchSubtypeText={this.state.searchSubtypeText}
                           handleInputCallback={this.handleUserInput}
                           handleOracleInputCallback={this.handleOracleUserInput}
                           handleSubtypeInputCallback={this.handleSubtypeUserInput} manaParams={this.state.manaParams}
                           manaParamsInputCallback={this.handleManaParamsInput}/>
            </div>
        )
    },
    componentWillMount: function () {
        this.updateCards = _.debounce(this.updateCards, 100);
        this.updateCards();
    }
});

ReactDOM.render(<CardController />, document.body);