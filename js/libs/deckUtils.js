import _ from 'underscore';

export default {
    getDeckAsText: function(deck) {
        var output = '';
        for (var i = 0; i < deck.cards.length; i++) {
            var card = deck.cards[i];
            output = output.concat('\r\n' + card.ammount + ' ' + card.name);
        }
        return output;
    },
    getCardCount: function(deck) {
        var count = 0;
        for (var i = 0; i < deck.cards.length; i++) {
            count += deck.cards[i].ammount;
        }
        return count;
    },
    /**
     * @param deck
     * @param type The type you want to count. For example 'lands' will return the number of lands in the deck.
     * @returns {number} The number of cards in the deck which match the type given to the function.
     */
    getTypeCount: function(deck, type) {
        var count = 0;
        for (var i = 0; i < deck.cards.length; i++) {
            let type_line = deck.cards[i].type_line;
            if (type_line && type_line.includes(type))
                count += deck.cards[i].ammount;
        }
        return count;
    },
    getCardFromDeck: function(cardName, deck) {
        for (var card in deck.cards) {
            if (
                deck.cards[card].name.toUpperCase().trim() ===
                cardName.toUpperCase().trim()
            )
                return deck.cards[card];
        }
    },
    setCardAmmount: function(deck, cardName, ammount) {
        for (var card in deck.cards) {
            if (deck.cards[card].name === cardName)
                deck.cards[card].ammount = ammount;
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
    forValidCardSyntaxInDeckListAsText: function(deckListAsText, callback) {
        let lines = deckListAsText.split('\n');
        for (var line in lines) {
            try {
                let ammountAndName = this.getCardAmmountAndNameFromLine(
                    lines[line]
                );
                if (ammountAndName.length > 0) {
                    callback(ammountAndName[1], ammountAndName[0]);
                }
            } catch (err) {
                throw err;
            }
        }
    },
    /**
     * Takes a line from the decklist editor as a string and tries to parse the ammount and name of the card.
     * The following will work:
     * - '4 Lightning Bolt'
     * - 'Lightning Bolt'
     * - 'lightning bolt'
     * - '  lightning bolt '
     *
     * Lines that start with // will be ignored as comments and return and empty array.
     *
     * @param line A string in the form '4 Lightning Bolt' or "//These are creatures"
     * @returns {{value, index, criteria}|Array} The ammount and name of the card in an array as [4, 'Lightning Bolt'].
     */
    getCardAmmountAndNameFromLine: function(line) {
        if (!line.startsWith('//') && line !== '') {
            var cardName = '';
            var ammount = 1;
            try {
                let splitLine = line.split(' ');
                ammount = parseInt(splitLine[0]);
                if (isNaN(ammount)) {
                    ammount = 1;
                    cardName = line;
                }
            } catch (err) {
                ammount = 1;
            }
            if (cardName === '') {
                try {
                    cardName = line.substring(line.indexOf(' ') + 1);
                    cardName = cardName.trim();
                } catch (err) {
                    cardName = line;
                }
            }
            return [ammount, cardName];
        } else {
            return [];
        }
    },
    /**
     * Takes a deck list as text and a card. Will return a deckListAsText with a copy of the given card added to it.
     * Checks for existing copies.
     *
     * @param deckListAsText The deck list with as a string with each card on new line in form "1 Birds of Paradise"
     * @param card The card as a fully populate object.
     */
    addCardToDeckListAsText: function(deckListAsText, card) {
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
                        line = ammount
                            .toString()
                            .concat(' ')
                            .concat(card.name);
                        foundCard = true;
                    }
                    if (i != 0) line = '\n'.concat(line);
                    newDeckListAsText = newDeckListAsText.concat(line);
                } catch (err) {
                    throw err;
                }
            }
        }
        if (!foundCard) {
            if (deckListAsText.trim() !== '') {
                newDeckListAsText =
                    newDeckListAsText + '\n1 '.concat(card.name);
            } else {
                newDeckListAsText = '1 '.concat(card.name);
            }
        }
        return newDeckListAsText;
    },
    getDeckAsSortedDeckListText: function(deck, deckListAsText) {
        let lines = deckListAsText.split('\n');
        let creatureSpells = [];
        let nonCreatureSpells = [];
        let lands = [];

        let unknownCardLines = [];

        if (deckListAsText.trim() !== '') {
            for (var i in lines) {
                let line = lines[i];
                let cardName = line.substring(lines[i].indexOf(' ') + 1);
                //let splitLine = lines[i].split(' ');
                let card = this.getCardFromDeck(cardName, deck);
                if (card !== undefined) {
                    if (card.type_line.includes('Creature')) {
                        creatureSpells.push(card);
                    } else if (card.type_line.includes('Land')) {
                        lands.push(card);
                    } else {
                        nonCreatureSpells.push(card);
                    }
                } else if (
                    !line.startsWith('//') &&
                    !(!line || /^\s*$/.test(line))
                ) {
                    unknownCardLines.push(line);
                }
            }
        }

        creatureSpells = this.getSortedByManaCost(creatureSpells);
        nonCreatureSpells = this.getSortedByManaCost(nonCreatureSpells);

        let newDeckListAsText = '';
        if (creatureSpells.length > 0) {
            newDeckListAsText += '//Creatures\n';
            for (let creature in creatureSpells) {
                newDeckListAsText +=
                    creatureSpells[creature].ammount +
                    ' ' +
                    creatureSpells[creature].name +
                    '\n';
            }
            newDeckListAsText += '\n';
        }
        if (nonCreatureSpells.length > 0) {
            newDeckListAsText += '//Non-creature Spells\n';
            for (let card in nonCreatureSpells) {
                newDeckListAsText +=
                    nonCreatureSpells[card].ammount +
                    ' ' +
                    nonCreatureSpells[card].name +
                    '\n';
            }
        }
        if (lands.length > 0) {
            newDeckListAsText += '//Lands\n';
            for (let land in lands) {
                newDeckListAsText +=
                    lands[land].ammount + ' ' + lands[land].name + '\n';
            }
            newDeckListAsText += '\n';
        }
        if (unknownCardLines.length > 0) {
            newDeckListAsText += '//???:\n';
            for (let line in unknownCardLines) {
                newDeckListAsText += unknownCardLines[line] + '\n';
            }
            newDeckListAsText += '\n';
        }
        return newDeckListAsText;
    },
    getSortedByManaCost(cards) {
        return _.sortBy(cards, 'cmc');
    }
};
