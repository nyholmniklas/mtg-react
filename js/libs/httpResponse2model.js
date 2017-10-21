/**
 * Returns the card from the response as a card object and tries to guess the best image url for that card.
 *
 */
export function getCardFromResponse(response) {
    return JSON.parse(response.responseText).data;
}

/**
 * Takes an HTTP response(which should contain cards as JSON) and returns the cards as an array.
 * We also try to guess the best image url for that card.
 *
 */
export function getCardsFromResponse(response) {
    return JSON.parse(response.responseText).data;
}
