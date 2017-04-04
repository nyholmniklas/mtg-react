import McFly from 'mcfly'
import QueryUtils from './../util/QueryUtils.js'

var _cards = [];

function updateCards(searchText, searchOracleText, searchSubtypeText, manaParams) {
    const sets = [];
    makeRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
}

function handleResponse(response, sets) {
    if (response.readyState == 4 && response.status == 200) {
        _cards = (QueryUtils.getCardsFromResponse(response, sets));
        store.emitChange();
    }
}

function makeRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        handleResponse(xmlHttp, sets);
    };
    var requestUrlParams = QueryUtils.buildQueryParams(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
    xmlHttp.open("GET", "https://api.deckbrew.com/mtg/cards?" + requestUrlParams); // false for synchronous request
    xmlHttp.send(null);
}

const store = new McFly().createStore({
    getCards: function () {
        return _cards;
    }
}, function (payload) {
    if (payload.actionType === "UPDATE_CARDS") {
        updateCards(payload.searchText, payload.searchOracleText, payload.searchSubtypeText, payload.manaParams);
    }
});

export default store;