import * as HttpResponse2Model from './httpResponse2model.js';
import * as QueryBuilder from './queryBuilder.js';

class DeckBrewApi {

    static getCards(searchText, searchOracleText = '', searchSubtypeText = '', manaParams = '', sets = '', formatLegalityFilter = '') {
        return new Promise(
            function (resolve, reject) {
                // Do not even make request if search text is only param and it is shorter than three characters
                if (searchText.length < 3 && searchOracleText === '' && searchSubtypeText === '' && manaParams === '' && sets === '') {
                    resolve();
                    return;
                }
                var xmlHttp = new XMLHttpRequest();

                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(HttpResponse2Model.getCardsFromResponse(xmlHttp));
                    else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) reject();
                };
                let requestUrlParams = QueryBuilder.buildQueryParamsForFuzzyRequest(searchText, searchOracleText,
                    searchSubtypeText, manaParams, sets, formatLegalityFilter);
                xmlHttp.open('GET', 'https://api.deckbrew.com/mtg/cards?' + requestUrlParams);
                xmlHttp.send(null);
            });
    }

    static getCard(cardName) {
        return new Promise(
            function (resolve) {
                // Do not even make request if search text is only param and it is shorter than 2 characters
                if (cardName.length < 2) {
                    resolve();
                    return;
                }
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(HttpResponse2Model.getCardFromResponse(xmlHttp));
                    else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
                        resolve();
                    }
                };
                cardName = cardName.replace(',', '-').replace(/\s/g, '-').replace('\'', '').replace('--', '-').toLowerCase();
                xmlHttp.open('GET', 'https://api.deckbrew.com/mtg/cards/' + cardName);
                xmlHttp.onerror = function () {
                    console.log('error' + xmlHttp.status);
                };
                xmlHttp.send(null);
            });
    }
}

export default DeckBrewApi;