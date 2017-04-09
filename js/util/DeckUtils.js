export default {
    getDeckAsText: function (deck) {
        var output = '';
        for (var i = 0; i < deck.cards.length; i++) {
            var card = deck.cards[i];
            output = output.concat('\r\n' + card.ammount + ' ' + card.name);
        }
        return output;
    },
    getCardCount: function (deck) {
        var count = 0;
        for (var i = 0; i < deck.cards.length; i++) {
            count += deck.cards[i].ammount;
        }
        return count;
    },
    getCardFromDeck: function (cardName, deck) {
        for (var card in deck.cards) {
            if (deck.cards[card].name === cardName) return deck.cards[card];
        }
    },
    setCardAmmount: function (deck, cardName, ammount) {
        for (var card in deck.cards) {
            if (deck.cards[card].name === cardName) deck.cards[card].ammount = ammount;
        }
        return deck;
    }

};