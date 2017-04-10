import McFly from 'mcfly';
import _ from 'underscore';
import DeckUtils from '../libs/deckUtils';
import QueryUtils from '../libs/deckBrewApi';

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

function setDeckListFromText() {
    let promises = [];
    let tempDeck = {
        cards: []
    };
    //For each line in _deckListAsText in valid syntax
    DeckUtils.forValidCardSyntaxInDeckListAsText(_deckListAsText, (cardName, ammount) => {
        //Check if card can be found from the current deck object, and if it can, add it to tempDeck with correct ammount...
        let card = DeckUtils.getCardFromDeck(cardName, _deck);
        if (card !== undefined) {
            card.ammount = ammount;
            tempDeck.cards.push(card);
        } else {
            //... if we can't, add a new promise to promises to query api for the card based on name.
            promises.push(new Promise(function (resolve) {
                let promise = QueryUtils.getCard(cardName);
                promise.then(function (response, sets) {
                    resolve([response, ammount], sets);
                });
            }));
        }
    });
    Promise.all(promises).then((responses) => {
        for (var i in responses) {
            let card = responses[i][0];
            if (card !== undefined) {
                card.ammount = responses[i][1];
                tempDeck.cards.push(card);
            }
        }
        _deck = tempDeck;
        store.emitChange();
    });
}

var _debouncedDeckUpdate = _.debounce(setDeckListFromText, 500);

//TODO: Don't manipulate DOM directly, there must be better way..
function downloadDeck() {
    var data = new Blob([DeckUtils.getDeckAsText(_deck)], {type: 'text/plain'});
    var url = (window.webkitURL || window.URL).createObjectURL(data);
    //TODO check if element already exists and replace it
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
    },
}, function (payload) {
    if (payload.actionType === 'ADD_CARD_TO_DECK') {
        _deckListAsText = DeckUtils.addCardToDeckListAsText(_deckListAsText, payload.card);
        store.emitChange();
        _debouncedDeckUpdate();
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
        _debouncedDeckUpdate();
    }
});

export default store;