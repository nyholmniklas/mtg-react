import * as HttpResponse2Model from '~/libs/httpResponse2model.js';
import * as QueryBuilder from '~/libs/queryBuilder.js';

class DeckBrewApi {

    static getCards(searchParams) {
        let searchText = searchParams.searchText;
        let searchOracleText = searchParams.searchOracleText;
        let searchTypeText = searchParams.searchTypeText;
        let searchSubtypeText = searchParams.searchSubtypeText;
        let manaParams = searchParams.manaParams;
        let sets = [];
        let formatLegalityFilter = searchParams.formatLegalityFilter;
        return new Promise(
            function (resolve) {
                // Do not even make request if search text is only param and it is shorter than three characters
                if (searchText.length < 3 && searchOracleText === '' && searchTypeText === '' && searchSubtypeText === '' && manaParams === '' && sets === '') {
                    resolve();
                    return;
                }
                var xmlHttp = new XMLHttpRequest();

                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve([HttpResponse2Model.getCardsFromResponse(xmlHttp), searchParams]);
                    else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) resolve();
                };
                let requestUrlParams = QueryBuilder.buildQueryParamsForFuzzyRequest(searchText, searchOracleText,
                    searchTypeText, searchSubtypeText, manaParams, sets, formatLegalityFilter);
                xmlHttp.open('GET', 'http://api.deckbrew.com/mtg/cards?' + requestUrlParams);
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
                xmlHttp.open('GET', 'http://api.deckbrew.com/mtg/cards/' + cardName);
                xmlHttp.onerror = function () {
                    console.log('error' + xmlHttp.status);
                };
                xmlHttp.send(null);
            });
    }
}

export default DeckBrewApi;