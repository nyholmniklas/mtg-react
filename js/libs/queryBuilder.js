export function buildQueryParamsForFuzzyRequest(searchText, searchOracleText, searchTypeText, searchSubtypeText, manaParams, sets, formatLegalityFilter) {
    //Set query params
    let setQuery = '';
    for (var i = 0; i < sets.length; i++) {
        setQuery = setQuery + '&set=' + sets[i];
    }
    setQuery = '';
    //Type query params
    let typeQuery = '';
    if (searchTypeText != null && searchTypeText != '') {
        typeQuery = '&type=' + searchTypeText;
    }
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
    let formatFilter = '';
    if (formatLegalityFilter !== '') formatFilter = '&format=' + formatLegalityFilter;
    const requestUrlParams = 'name=' + searchText + '&oracle=' + searchOracleText
        + typeQuery + setQuery + subtypeQuery + manaQuery + formatFilter;
    return requestUrlParams;
}