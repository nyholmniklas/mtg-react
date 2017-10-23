export function buildQueryParamsForFuzzyRequest(searchParams) {
    let params = searchParams.searchText;
    params = setFormat(searchParams.formatLegalityFilter)(params);
    params = setOracle(searchParams.searchOracleText)(params);
    params = setType(searchParams.searchTypeText)(params);
    return params;
}

let setFormat = format => addParam('f', format);

let setOracle = oracleText => addParam('o', oracleText);

let setType = type => addParam('t', type);

let addParam = (key, value) => {
    let queryFunction = query => {
        if (value) query = query + '+' + key + '=' + value;
        return query;
    };
    return queryFunction;
};
