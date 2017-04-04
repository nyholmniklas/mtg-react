import React from 'react'
import update from 'react-addons-update'
import SearchField from './SearchField.js'
import ManaColorSelector from './ManaColorSelector.js'
import DeckUtils from '../util/DeckUtils.js'
import ExportButton from './ExportButton.js'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
    }

    handleSearchTextInput(searchText) {
        this.setState(update(this.state, {
            searchText: {$set: searchText}
        }));
        this.props.searchCards(searchText);
    }

    render() {
        return (
            <div className="searchBar">
                Card name: <SearchField searchText={this.state.searchText}
                                        onUserInput={this.handleSearchTextInput}/>
                Oracle rules: <SearchField searchText={this.props.searchOracleText}
                                           onUserInput={this.props.handleOracleInputCallback}/>
                Subtype(exact search): <SearchField searchText={this.props.searchSubtypeText}
                                                    onUserInput={this.props.handleSubtypeInputCallback}/>
                <ManaColorSelector manaParams={this.props.manaParams}
                                   manaParamsInputCallback={this.props.manaParamsInputCallback}/>
                Cards: {DeckUtils.getCardCount(this.props.deck)} / 60
                <ExportButton deck={this.props.deck}/>
            </div>
        )
    }
}

export default SearchBar;