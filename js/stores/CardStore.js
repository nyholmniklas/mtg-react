import McFly from 'mcfly';
import _ from 'underscore';

import QueryUtils from '~/libs/deckBrewApi.js';

var _cards = [];
var _searchParams = {
    searchText: '',
    searchOracleText: '',
    searchTypeText: '',
    manaParams: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false
    },
    formatLegalityFilter: ''
};

function searchCards() {
    QueryUtils.getCards(_searchParams).then(handleResponse);
}

function handleResponse(response) {
    let cards = (_cards = []);
    if (response !== undefined) {
        cards = response[0];
        for (let card in cards) {
            cards[card].orderNumber = card;
        }
        let searchParams = response[1];
        //check for race condition by comparing the search params given of the api search with the ones currently in store
        if (cards !== undefined && _.isEqual(searchParams, _searchParams)) {
            _cards = cards;
        }
    }
    store.emitChange();
}

const store = new McFly().createStore(
    {
        getCards: function() {
            return _cards;
        },
        getSearchParams: function() {
            return _searchParams;
        }
    },
    function(payload) {
        if (payload.actionType === 'SEARCH_CARDS') {
            _searchParams = payload.searchParams;
            store.emitChange();
            searchCards();
        }
    }
);

export default store;
