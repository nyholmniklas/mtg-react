import McFly from 'mcfly'

var _deck = {
    cards: []
};

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

const store = new McFly().createStore({
    getDeck: function () {
        return _deck;
    }
}, function (payload) {
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