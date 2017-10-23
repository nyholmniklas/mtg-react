import * as HttpResponse2Model from '~/libs/httpResponse2model.js';
import * as QueryBuilder from '~/libs/queryBuilder.js';

class DeckBrewApi {
    static getCards(searchParams) {
        return new Promise(function(resolve) {
            // Do not even make request if search text is only param and it is shorter than three characters
            if (
                searchParams.searchText.length < 3 &&
                searchParams.searchOracleText === '' &&
                searchParams.searchTypeText === '' &&
                searchParams.searchSubtypeText === '' &&
                searchParams.manaParams === '' &&
                searchParams.sets === ''
            ) {
                resolve();
                return;
            }
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve([
                        HttpResponse2Model.getCardsFromResponse(xmlHttp),
                        searchParams
                    ]);
                else if (xmlHttp.readyState == 4 && xmlHttp.status != 200)
                    resolve();
            };
            let requestUrlParams = QueryBuilder.buildQueryParamsForFuzzyRequest(
                searchParams
            );
            xmlHttp.open(
                'GET',
                'https://api.scryfall.com/cards/search?q=' + requestUrlParams
            );
            xmlHttp.send(null);
        });
    }

    static getCard(cardName) {
        return new Promise(function(resolve) {
            // Do not even make request if search text is only param and it is shorter than 2 characters
            if (cardName.length < 2) {
                resolve();
                return;
            }
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve(HttpResponse2Model.getCardFromResponse(xmlHttp));
                else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
                    resolve({});
                }
            };
            cardName = cardName
                .replace(',', '-')
                .replace(/\s/g, '-')
                .replace('\'', '')
                .replace('--', '-')
                .toLowerCase();
            xmlHttp.open(
                'GET',
                'https://api.scryfall.com/cards/named?exact=' + cardName
            );
            xmlHttp.onerror = function() {
                console.log('error' + xmlHttp.status);
            };
            xmlHttp.send(null);
        });
    }
}

export default DeckBrewApi;
