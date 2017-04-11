import McFly from 'mcfly';

var Flux = new McFly();

export default Flux.createActions({
    searchCards: function (searchParams) {
        return {
            actionType: 'SEARCH_CARDS',
            searchParams: searchParams
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