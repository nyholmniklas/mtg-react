import React from 'react';
import PropTypes from 'prop-types';
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
    cards: PropTypes.array.isRequired,
    cardClickedCallback: PropTypes.func
};