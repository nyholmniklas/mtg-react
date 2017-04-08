import React from 'react';
import update from 'react-addons-update';
import SearchField from './SearchField.jsx';
import ManaColorSelector from './ManaColorSelector.jsx';
import DeckUtils from '../util/DeckUtils.js';
import ExportButton from './ExportButton.jsx';
import { Form } from 'semantic-ui-react';

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
            searchOracleText: {$set: oracleSearchText}
        }), this.searchCards);
    }

    handleSubtypeUserInput(subtypeSearchText) {
        this.setState(update(this.state, {
            searchSubtypeText: {$set: subtypeSearchText}
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
            <Form className="three wide column searchBar">
                <SearchField placeholder="Card name" searchText={this.state.searchText}
                                        onUserInput={this.handleSearchTextInput}/>
                <SearchField placeholder="Oracle text" searchText={this.state.searchOracleText}
                                           onUserInput={this.handleOracleUserInput}/>
                <SearchField placeholder="Subtype" searchText={this.state.searchSubtypeText}
                                                    onUserInput={this.handleSubtypeUserInput}/>
                <br/>
                <ManaColorSelector manaParams={this.state.manaParams}
                                   manaParamsInputCallback={this.handleManaParamsInput}/>
                <br/>
                Cards: {DeckUtils.getCardCount(this.props.deck)} / 60
                <br/>
                <ExportButton onClick={this.props.downloadDeckCallback}/>
            </Form>
        );
    }
}

SearchBar.propTypes = {
    searchCards: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    downloadDeckCallback: React.PropTypes.func.isRequired
};