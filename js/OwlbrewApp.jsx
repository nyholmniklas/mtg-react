import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import update from 'react-addons-update';
import { Grid } from 'semantic-ui-react';

import CardStore from './stores/CardStore.js';
import DeckStore from './stores/DeckStore.js';
import CardActions from './Actions.js';

import MainArea from './components/MainArea.jsx';
import SideBar from './components/SideBar.jsx';

class OwlbrewApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Can be 'search' or 'stats'
            mainAreaContent: 'search',
            deck: DeckStore.getDeck(),
            deckListAsText: DeckStore.getDeckListAsText(),
            cardSearchResults: CardStore.getCards(),
            searchParams: CardStore.getSearchParams()
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
            cardSearchResults: {$set: CardStore.getCards()},
            searchParams: {$set: CardStore.getSearchParams()}
        }));
    }

    searchCards(searchParams) {
        CardActions.searchCards(searchParams);
    }

    render() {
        return (
            <Grid className='app'>
                <Grid.Column width={12}>
                    <MainArea mainAreaContent={this.state.mainAreaContent} searchParams={this.state.searchParams}
                              searchCards={this.searchCards}
                              cardSearchResults={this.state.cardSearchResults} deck={this.state.deck}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <SideBar deckListAsText={this.state.deckListAsText}
                             deckListTextChanged={this.deckListTextChanged} deck={this.state.deck}/>
                </Grid.Column>
            </Grid>
        );
    }

    componentWillMount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }
}

reactMixin(OwlbrewApp.prototype, CardStore.mixin);
reactMixin(OwlbrewApp.prototype, DeckStore.mixin);

ReactDOM.render(<OwlbrewApp />, document.getElementById('app-container'));