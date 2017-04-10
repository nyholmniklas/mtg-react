import McFly from 'mcfly';
import QueryUtils from '../libs/deckBrewApi.js';

var _cards = [];

function updateCards(searchText, searchOracleText, searchSubtypeText, manaParams) {
    const sets = [];
    let promise = QueryUtils.getCards(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
    promise.then(function (response, sets) {
        handleResponse(response, sets);
    });
}

function handleResponse(cards) {
    if (cards !== undefined) {
        _cards = cards;
        store.emitChange();
    }
}

const store = new McFly().createStore({
    getCards: function () {
        return _cards;
    }
}, function (payload) {
    if (payload.actionType === 'UPDATE_CARDS') {
        updateCards(payload.searchText, payload.searchOracleText, payload.searchSubtypeText, payload.manaParams);
    }
});

export default store;