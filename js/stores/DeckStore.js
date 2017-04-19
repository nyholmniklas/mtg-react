import McFly from 'mcfly';

import DeckUtils from '~/libs/deckUtils';
import QueryUtils from '~/libs/deckBrewApi';

var _deck = {
    cards: []
};

var _deckListAsText = '';

function removeCardFromDeck(cardToRemove) {
    for (var i = 0; i < _deck.cards.length; i++) {
        var card = _deck.cards[i];
        if (card.id === cardToRemove.id) {
            if (card.ammount > 1) {
                card.ammount--;
            } else if (card.ammount == 1) {
                _deck.cards.splice(i, 1);
            }
        }
    }
}

function setDeckListFromText(force = false, callback = undefined) {
    let promises = [];
    let tempDeck = {
        cards: []
    };
    let tempDeckListAsText = _deckListAsText;
    //For each line in _deckListAsText in valid syntax
    DeckUtils.forValidCardSyntaxInDeckListAsText(tempDeckListAsText, (cardName, ammount) => {
        //Check if card can be found from the current deck object, and if it can, add it to tempDeck with correct ammount...
        let card = DeckUtils.getCardFromDeck(cardName, _deck);
        if (card !== undefined) {
            promises.push(new Promise(function (resolve) {
                card.ammount = ammount;
                //tempDeck.cards.push(card);
                resolve([card, card.ammount]);
            }));
        } else {
            //... if we can't, add a new promise to promises to query api for the card based on name.
            promises.push(new Promise(function (resolve) {
                let promise = QueryUtils.getCard(cardName);
                promise.then(function (response) {
                    resolve([response, ammount]);
                });
            }));
        }
    });
    Promise.all(promises).then((responses) => {
        for (var i in responses) {
            let card = responses[i][0];
            if (card !== undefined) {
                card.ammount = responses[i][1];
                card.orderNumber = i;
                tempDeck.cards.push(card);
            }
        }
        //check for race condition by comparing the text used to set the deck list with current decklist text
        if (force || tempDeckListAsText === _deckListAsText) {
            _deck = tempDeck;
            if (callback !== undefined) {
                callback();
            }
            store.emitChange();
        }
    });
}

function sortDeck() {
    let callback = () => {
        _deckListAsText = DeckUtils.getDeckAsSortedDeckListText(_deck, _deckListAsText);
        setDeckListFromText(true);
    };
    setDeckListFromText(true, callback);
}

function downloadDeck() {
    var data = new Blob([_deckListAsText], {type: 'text/plain'});
    var url = (window.webkitURL || window.URL).createObjectURL(data);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'mydeck.txt';
    a.click();
}

const store = new McFly().createStore({
    getDeck: function () {
        return _deck;
    },
    getDeckListAsText: function () {
        return _deckListAsText;
    }
}, function (payload) {
    if (payload.actionType === 'ADD_CARD_TO_DECK') {
        _deckListAsText = DeckUtils.addCardToDeckListAsText(_deckListAsText, payload.card);
        setDeckListFromText();
        store.emitChange();
    }
    if (payload.actionType === 'REMOVE_CARD_FROM_DECK') {
        removeCardFromDeck(payload.card);
        store.emitChange();
    }
    if (payload.actionType === 'DOWNLOAD_DECK') {
        downloadDeck();
    }
    if (payload.actionType === 'UPDATE_DECK_BASED_ON_TEXT') {
        _deckListAsText = payload.deckListAsText;
        store.emitChange();
        setDeckListFromText();
    }
    if (payload.actionType === 'SORT_DECK') {
        sortDeck();
    }
});

export default store;