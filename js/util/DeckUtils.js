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
    }

};