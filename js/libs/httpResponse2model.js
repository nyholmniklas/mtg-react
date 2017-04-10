/**
 * Returns the card from the response as a card object and tries to guess the best image url for that card.
 *
 */
export function getCardFromResponse(response) {
    const card = JSON.parse(response.responseText);
    return setCardImageUrls([card])[0];
}

/**
 * Takes an array of cards and and returns a filtered array of cards without duplicates of the
 * same card from different editions/sets. Additionally we try to pick the correct image for that card.
 * Note that if an image cannot be found, the card will be omitted altogether from the array this function returns.
 *
 */
export function setCardImageUrls(cards) {
    let filteredCards = [];
    for (var i = 0; i < cards.length; i++) {
        let card = cards[i];
        let imageFound = false;
        for (var k = 0; k < card.editions.length; k++) {
            if (card.editions[k].image_url != 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') {
                card.img_url = card.editions[k].image_url;
                imageFound = true;
                break;
            }
        }
        if (imageFound) {
            filteredCards.push(card);
        }
    }
    return filteredCards;
}