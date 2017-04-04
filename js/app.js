import React from 'react'
import ReactDOM from 'react-dom'
import reactMixin from 'react-mixin'
import CardStore from './stores/store.js'
import CardActions, {getDeck, getCards} from './actions.js'
import Card from './components/Deck.js'
import Cards from './components/Cards.js'
import Deck from './components/Deck.js'
import ExportButton from './components/ExportButton.js'
import ManaColorSelector from './components/ManaColorSelector.js'
import SearchBar from './components/SearchBar.js'
import SearchResults from './components/SearchResults.js'

class CardController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.storeDidChange = this.storeDidChange.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleOracleUserInput = this.handleOracleUserInput.bind(this);
        this.handleSubtypeUserInput = this.handleSubtypeUserInput.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.onSearchResultsScroll = this.onSearchResultsScroll.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.updateCards = this.updateCards.bind(this);
        this.addCardToDeck = this.addCardToDeck.bind(this);
        this.removeCardfromDeck = this.removeCardfromDeck.bind(this);
    }

    isMounted() {
        return this.mounted;
    }

    storeDidChange() {
        this.setState({
            deck: getDeck(),
            cards: getCards(),
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            searchResultsScroll: 0
        });
    }

    handleUserInput(searchText) {
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
    }

    handleOracleUserInput(oracleSearchText) {
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
    }

    handleSubtypeUserInput(subtypeSearchText) {
        this.setState(
{            deck: this.state.deck,
            cards: this.state.cards,
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: subtypeSearchText,
            manaParams: this.state.manaParams,
            searchResultsScroll: this.state.searchResultsScroll
        });
        this.updateCards();
    }

    handleManaParamsInput(manaParams) {
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
    }

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
    }

    updateCards() {
        CardActions.updateCards(this.state.searchText, this.state.searchOracleText, this.state.searchSubtypeText, this.state.manaParams);
    }

    addCardToDeck(card) {
        CardActions.addCardToDeck(card);
    }

    removeCardfromDeck(card) {
        CardActions.removeCardfromDeck(card);
    }

    render(){
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
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillMount() {
        this.mounted = false;
        this.updateCards = _.debounce(this.updateCards, 100);
        this.updateCards();
    }
}

reactMixin(CardController.prototype, CardStore.mixin)

ReactDOM.render(<CardController />, document.body);