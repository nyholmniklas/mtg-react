import React from 'react'
import ReactDOM from 'react-dom'
import reactMixin from 'react-mixin'
import update from 'react-addons-update'
import CardStore from './stores/CardStore.js'
import DeckStore from './stores/DeckStore.js'
import CardActions from './actions.js'
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
            deck: DeckStore.getDeck(),
            cards: CardStore.getCards(),
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
        this.handleOracleUserInput = this.handleOracleUserInput.bind(this);
        this.handleSubtypeUserInput = this.handleSubtypeUserInput.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.onSearchResultsScroll = this.onSearchResultsScroll.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.searchCards = this.searchCards.bind(this);
    }

    isMounted() {
        return this.mounted;
    }

    storeDidChange() {
        this.setState(update(this.state, {
            deck: {$set: DeckStore.getDeck()},
            cards: {$set: CardStore.getCards()},
            searchResultsScroll: {$set: 0}
        }));
    }

    handleOracleUserInput(oracleSearchText) {
        this.setState(update(this.state, {
            oracleSearchText: {$set: oracleSearchText}
        }));
        this.searchCards();
    }

    handleSubtypeUserInput(subtypeSearchText) {
        this.setState(update(this.state, {
            subtypeSearchText: {$set: subtypeSearchText}
        }));
        this.searchCards();
    }

    handleManaParamsInput(manaParams) {
        this.setState(update(this.state, {
            manaParams: {$set: manaParams}
        }));
        this.searchCards();
    }

    onSearchResultsScroll(scroll) {
        this.setState(update(this.state, {
            searchResultsScroll: {$set: scroll}
        }));
    }

    searchCards() {
        CardActions.updateCards('', this.state.searchOracleText, this.state.searchSubtypeText, this.state.manaParams);
    }

    searchCards(searchText) {
        CardActions.updateCards('', this.state.searchOracleText, this.state.searchSubtypeText, this.state.manaParams);
    }

    render(){
        return (
            <div className="app">
                <SearchResults ref="searchResults" cards={this.state.cards} cardClickedCallback={CardActions.addCardToDeck}
                               scroll={this.state.searchResultsScroll} onScroll={this.onSearchResultsScroll}/>
                <Deck cards={this.state.deck.cards} cardClickedCallback={CardActions.removeCardfromDeck}/>
                <SearchBar searchCards={this.searchCards} deck={this.state.deck}
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
        this.searchCards = _.debounce(this.searchCards, 100);
        this.searchCards();
    }
}

reactMixin(CardController.prototype, CardStore.mixin)
reactMixin(CardController.prototype, DeckStore.mixin)

ReactDOM.render(<CardController />, document.body);