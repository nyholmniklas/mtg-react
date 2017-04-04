import McFly from 'mcfly'
import CardStore from "./stores/store.js"

var Flux = new McFly();

export default Flux.createActions({
    updateCards: function (searchText, searchOracleText, searchSubtypeText, manaParams) {
        return {
            actionType: "UPDATE_CARDS",
            searchText: searchText,
            searchOracleText: searchOracleText,
            searchSubtypeText: searchSubtypeText,
            manaParams: manaParams
        }
    },
    addCardToDeck: function(card) {
        return {
            actionType: "ADD_CARD_TO_DECK",
            card: card
        }
    },
    removeCardfromDeck: function(card) {
        return {
            actionType: "REMOVE_CARD_FROM_DECK",
            card: card
        }
    }
});

export var getCards = function () {
    return CardStore.getCards();
}

export var getDeck = function(){
    return CardStore.getDeck();
}