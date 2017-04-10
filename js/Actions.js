import McFly from 'mcfly';

var Flux = new McFly();

export default Flux.createActions({
    updateCards: function (searchText, searchOracleText, searchSubtypeText, manaParams, formatLegalityFilter) {
        return {
            actionType: 'UPDATE_CARDS',
            searchText: searchText,
            searchOracleText: searchOracleText,
            searchSubtypeText: searchSubtypeText,
            manaParams: manaParams,
            formatLegalityFilter: formatLegalityFilter,
        };
    },
    addCardToDeck: function (card) {
        return {
            actionType: 'ADD_CARD_TO_DECK',
            card: card,
        };
    },
    removeCardfromDeck: function (card) {
        return {
            actionType: 'REMOVE_CARD_FROM_DECK',
            card: card,
        };
    },
    downloadDeck: function () {
        return {
            actionType: 'DOWNLOAD_DECK',
        };
    },
    updateDeckFromDeckListAsText: function (deckListAsText) {
        return {
            actionType: 'UPDATE_DECK_BASED_ON_TEXT',
            deckListAsText: deckListAsText,
        };
    }
});