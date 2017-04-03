import React from 'react'
import Card from './Card.js';
import Cards from './Cards.js';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    onScroll() {
        this.props.onScroll(this.searchResults.scrollTop);
    }

    componentDidUpdate() {
        this.searchResults.scrollTop= this.props.scroll;
    }

    render() {
        return (
            <div ref={(searchResults) => {this.searchResults = searchResults;}} className="searchResults"
                 onScroll={this.onScroll}>
                <Cards cards={this.props.cards} cardClickedCallback={this.props.cardClickedCallback}/>
            </div>
        )
    }
}

export default SearchResults;