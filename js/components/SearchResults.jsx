import React from 'react';
import { Container } from 'semantic-ui-react';

import Cards from '~/components/Cards.jsx';

export default class SearchResults extends React.Component {
    render() {
        return (
            <Container className="searchResults">
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </Container>
        );
    }
}

SearchResults.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func
};