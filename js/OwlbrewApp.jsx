import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import update from 'react-addons-update';
import _ from 'underscore';
import CardStore from './stores/CardStore.js';
import DeckStore from './stores/DeckStore.js';
import CardActions from './Actions.js';
import Deck from './components/Deck.jsx';
import MainArea from './components/MainArea.jsx';
import { Grid } from 'semantic-ui-react';

class OwlbrewApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Can be 'search' or 'stats'
            mainAreaContent: 'search',
            deck: DeckStore.getDeck(),
            deckListAsText: DeckStore.getDeckListAsText(),
            cardSearchResults: CardStore.getCards(),
        };
        this.deckListTextChanged = CardActions.updateDeckFromDeckListAsText;
        this.storeDidChange = this.storeDidChange.bind(this);
        this.searchCards = this.searchCards.bind(this);
    }

    isMounted() {
        return this.mounted;
    }

    storeDidChange() {
        this.setState(update(this.state, {
            deck: {$set: DeckStore.getDeck()},
            deckListAsText: {$set: DeckStore.getDeckListAsText()},
            cardSearchResults: {$set: CardStore.getCards()}
        }));
    }

    searchCards(searchText, searchOracleText, searchSubtypeText, manaParams, formatLegalityFilter) {
        CardActions.updateCards(searchText, searchOracleText, searchSubtypeText, manaParams, formatLegalityFilter);
    }

    render() {
        return (
            <Grid className='app'>
                    <Grid.Column width={12}>
                        <MainArea mainAreaContent={this.state.mainAreaContent} searchCards={this.searchCards}
                                  cardSearchResults={this.state.cardSearchResults} deck={this.state.deck}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Deck deckListAsText={this.state.deckListAsText}
                              deckListTextChanged={this.deckListTextChanged}/>
                    </Grid.Column>
            </Grid>
        );
    }

    componentWillMount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        //const initManaParams = {
        //    white: false,
        //    blue: false,
        //    black: false,
        //    red: false,
        //    green: false
        //};
        this.searchCards = _.debounce(this.searchCards, 200);
        //this.searchCards('', '', '', initManaParams);
    }
}

reactMixin(OwlbrewApp.prototype, CardStore.mixin);
reactMixin(OwlbrewApp.prototype, DeckStore.mixin);

ReactDOM.render(<OwlbrewApp />, document.getElementById('app-container'));