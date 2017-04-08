import React from 'react';
import Cards from './Cards.jsx';

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="nine wide column searchResults">
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        );
    }
}

SearchResults.propTypes = {
    cards: React.PropTypes.array.isRequired,
    cardClickedCallback: React.PropTypes.func
};