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
    getLandCount: function (deck) {
        var count = 0;
        for (var i = 0; i < deck.cards.length; i++) {
            if (deck.cards[i].types.includes('land'))count += deck.cards[i].ammount;
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
    },
    /**
     * Iterates through the deck list as text, and for each line in valid syntax, it will call the given callback with
     * the parsed cardName and ammount.
     *
     * @param deckListAsText The deck list with as a string with each card on new line in form "1 Birds of Paradise"
     * @param callback Will call this function with cardName and ammount: callback(cardName, ammount)
     */
    forValidCardSyntaxInDeckListAsText: function (deckListAsText, callback) {
        let lines = deckListAsText.split('\n');
        for (var line in lines) {
            try {
                let splitLine = lines[line].split(' ');
                var ammount = 1;
                try {
                    ammount = parseInt(splitLine[0]);
                } catch (err) {
                    ammount = 1;
                }
                let cardName = lines[line].substring(lines[line].indexOf(' ') + 1);
                callback(cardName, ammount);
            } catch (err) {
                throw err;
            }
        }
    },
    /**
     * Takes a deck list as text and a card. Will return a deckListAsText with a copy of the given card added to it.
     * Checks for existing copies.
     *
     * @param deckListAsText The deck list with as a string with each card on new line in form "1 Birds of Paradise"
     * @param card The card as a fully populate object.
     */
    addCardToDeckListAsText: function (deckListAsText, card) {
        let newDeckListAsText = '';
        let foundCard = false;

        let lines = deckListAsText.split('\n');
        if (deckListAsText.trim() !== '') {
            for (var i in lines) {
                let line = lines[i];
                try {
                    let cardName = line.substring(lines[i].indexOf(' ') + 1);
                    let splitLine = lines[i].split(' ');
                    if (cardName === card.name) {
                        let ammount = parseInt(splitLine[0]) + 1;
                        line = ammount.toString().concat(' ').concat(card.name);
                        foundCard = true;
                    }
                    if (i != 0) line = ('\n').concat(line);
                    newDeckListAsText = newDeckListAsText.concat(line);
                } catch (err) {
                    throw err;
                }
            }
        }
        if (!foundCard) {
            if (deckListAsText.trim() !== '') {
                newDeckListAsText = newDeckListAsText + '\n1 '.concat(card.name);
            } else {
                newDeckListAsText = '1 '.concat(card.name);
            }
        }
        return newDeckListAsText;
    },
}
;