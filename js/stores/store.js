import McFly from 'mcfly'
import QueryUtils from './../util/QueryUtils.js'

var mcFly = new McFly();

/** Store */
var _cards = [];
var _deck = {
    cards: []
};
function updateCards(searchText, searchOracleText, searchSubtypeText, manaParams) {
    const sets = [];
    makeRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
}

function handleResponse(response, sets) {
    if (response.readyState == 4 && response.status == 200) {
        _cards = (QueryUtils.getCardsFromResponse(response, sets));
    }
}

function makeRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        handleResponse(xmlHttp, sets);
    };
    var requestUrlParams = QueryUtils.buildQueryParams(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
    xmlHttp.open("GET", "https://api.deckbrew.com/mtg/cards?" + requestUrlParams, false); // false for synchronous request
    xmlHttp.send(null);
}

function addCardToDeck(cardToAdd) {
    // Check to see if we can find the card in the deck already and then increment id
    for (var i = 0; i < _deck.cards.length; i++) {
        var card = _deck.cards[i];
        if (card.id === cardToAdd.id) {
            card.ammount++;
            return;
        }
    }
    //If we can't then we set ammount of card to one and add it to deck
    //But first we need to copy object by value so as to not add the reference to the original card
    cardToAdd = JSON.parse(JSON.stringify(cardToAdd));
    if (cardToAdd.ammount == null) cardToAdd.ammount = 1;
    _deck.cards.push(cardToAdd);
}

function removeCardFromDeck(cardToRemove) {
    for (var i = 0; i < _deck.cards.length; i++) {
        var card = _deck.cards[i];
        if (card.id === cardToRemove.id) {
            if (card.ammount > 1) {
                card.ammount--;
            } else if (card.ammount == 1) {
                _deck.cards.splice(i, 1)
            }
        }
    }
}

const store = mcFly.createStore({
    getCards: function () {
        return _cards;
    },
    getDeck: function () {
        return _deck;
    }
}, function (payload) {
    if (payload.actionType === "UPDATE_CARDS") {
        updateCards(payload.searchText, payload.searchOracleText, payload.searchSubtypeText, payload.manaParams);
        store.emitChange();
    }
    if (payload.actionType === "ADD_CARD_TO_DECK") {
        addCardToDeck(payload.card);
        store.emitChange();
    }
    if (payload.actionType === "REMOVE_CARD_FROM_DECK") {
        removeCardFromDeck(payload.card);
        store.emitChange();
    }
});

export default store;