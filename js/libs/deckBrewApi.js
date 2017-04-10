import * as HttpResponse2Model from './httpResponse2model.js';

class DeckBrewApi {

    static getCards(searchText, searchOracleText = '', searchSubtypeText = '', manaParams = '', sets = '') {
        return new Promise(
            function (resolve, reject) {
                // Do not even make request if search text is only param and it is shorter than three characters
                if (searchText.length < 3 && searchOracleText === '' && searchSubtypeText === '' && manaParams === '' && sets === '') {
                    resolve();
                    return;
                }
                var xmlHttp = new XMLHttpRequest();

                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp, '');
                    else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) reject();
                };
                let requestUrlParams = DeckBrewApi.buildQueryParamsForFuzzyRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets);
                xmlHttp.open('GET', 'https://api.deckbrew.com/mtg/cards?' + requestUrlParams);
                xmlHttp.send(null);
            });
    }

    /**
     * Takes an HTTP response(which should contain cards as JSON) and returns the cards as an array.
     * We also try to guess the best image url for that card.
     *
     */
    static getCardsFromResponse(response) {
        const cards = JSON.parse(response.responseText);
        return HttpResponse2Model.setCardImageUrls(cards);
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

    static buildQueryParamsForFuzzyRequest(searchText, searchOracleText, searchSubtypeText, manaParams, sets) {
        //Set query params
        let setQuery = '';
        for (var i = 0; i < sets.length; i++) {
            setQuery = setQuery + '&set=' + sets[i];
        }
        setQuery = '';
        //Subtype query params
        let subtypeQuery = '';
        if (searchSubtypeText != null && searchSubtypeText != '') {
            subtypeQuery = '&subtype=' + searchSubtypeText;
        }
        //Mana colors query params
        let manaQuery = '';
        if (manaParams.white || manaParams.blue || manaParams.black || manaParams.red || manaParams.green) {
            if (manaParams.white) {
                manaQuery = manaQuery.concat('&color=white');
            }
            if (manaParams.blue) {
                manaQuery = manaQuery.concat('&color=blue');
            }
            if (manaParams.black) {
                manaQuery = manaQuery.concat('&color=black');
            }
            if (manaParams.red) {
                manaQuery = manaQuery.concat('&color=red');
            }
            if (manaParams.green) {
                manaQuery = manaQuery.concat('&color=green');
            }
        }
        if (searchOracleText == null) searchOracleText = '';
        const requestUrlParams = 'name=' + searchText + '&oracle=' + searchOracleText + setQuery + subtypeQuery + manaQuery;
        return requestUrlParams;
    }

}

export default DeckBrewApi;