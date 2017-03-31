import React from 'react'
import Card from './Card.js';
import Cards from './Cards.js';

class SearchResults extends React.Component {
    onScroll() {
        this.props.onScroll(this.refs.searchResults.getDOMNode().scrollTop);
    }

    render() {
        return (
            <div ref="searchResults" className="searchResults"
                 onScroll={this.onScroll}
                 scrollTop={this.props.scroll}>
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        )
    }

    componentDidUpdate() {
        this.refs.searchResults.getDOMNode().scrollTop = this.props.scroll;
    }
}

export default SearchResults;