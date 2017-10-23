import CardStore from '~/stores/CardStore.js';
import DeckStore from '~/stores/DeckStore.js';

export const initialState = {
    //Can be 'search' or 'stats'
    mainAreaContent: 'search',
    deck: DeckStore.getDeck(),
    deckListAsText: DeckStore.getDeckListAsText(),
    cardSearchResults: CardStore.getCards(),
    searchParams: CardStore.getSearchParams()
};
