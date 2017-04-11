import React from 'react';
import Cards from './Cards.jsx';
import { Container } from 'semantic-ui-react';

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