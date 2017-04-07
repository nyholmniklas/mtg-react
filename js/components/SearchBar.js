import React from 'react';
import update from 'react-addons-update';
import SearchField from './SearchField.js';
import ManaColorSelector from './ManaColorSelector.js';
import DeckUtils from '../util/DeckUtils.js';
import ExportButton from './ExportButton.js';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchOracleText: '',
            searchSubtypeText: '',
            manaParams: {
                white: false,
                blue: false,
                black: false,
                red: false,
                green: false
            }
        };
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.handleOracleUserInput = this.handleOracleUserInput.bind(this);
        this.handleSubtypeUserInput = this.handleSubtypeUserInput.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
    }

    handleSearchTextInput(searchText) {
        this.setState(update(this.state, {
            searchText: {$set: searchText}
        }), this.searchCards);
    }

    handleOracleUserInput(oracleSearchText) {
        this.setState(update(this.state, {
            oracleSearchText: {$set: oracleSearchText}
        }), this.searchCards);
    }

    handleSubtypeUserInput(subtypeSearchText) {
        this.setState(update(this.state, {
            subtypeSearchText: {$set: subtypeSearchText}
        }), this.searchCards);
    }

    handleManaParamsInput(manaParams) {
        this.setState(update(this.state, {
            manaParams: {$set: manaParams}
        }), this.searchCards);
    }

    searchCards() {
        this.props.searchCards(this.state.searchText, this.state.searchOracleText, this.state.searchSubtypeText, this.state.manaParams);
    }

    render() {
        return (
            <div className="searchBar">
                Card name: <SearchField searchText={this.state.searchText}
                                        onUserInput={this.handleSearchTextInput}/>
                Oracle rules: <SearchField searchText={this.state.searchOracleText}
                                           onUserInput={this.handleOracleUserInput}/>
                Subtype(exact search): <SearchField searchText={this.state.searchSubtypeText}
                                                    onUserInput={this.handleSubtypeUserInput}/>
                <ManaColorSelector manaParams={this.state.manaParams}
                                   manaParamsInputCallback={this.handleManaParamsInput}/>
                Cards: {DeckUtils.getCardCount(this.props.deck)} / 60
                <ExportButton onClick={this.props.downloadDeckCallback}/>
            </div>
        )
    }
}

SearchBar.propTypes = {
    searchCards: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    downloadDeckCallback: React.PropTypes.func.isRequired
}