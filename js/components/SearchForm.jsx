import React from 'react';
import update from 'react-addons-update';
import SearchField from './SearchField.jsx';
import LegalitySelector from './LegalitySelector.jsx';
import { Form } from 'semantic-ui-react';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.searchParams;
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.handleOracleUserInput = this.handleOracleUserInput.bind(this);
        this.handleSubtypeUserInput = this.handleSubtypeUserInput.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.handleFormatLegalityChange = this.handleFormatLegalityChange.bind(this);
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

    handleFormatLegalityChange(formatLegalityFilter) {
        this.setState(update(this.state, {
            formatLegalityFilter: {$set: formatLegalityFilter}
        }), this.searchCards);
    }

    searchCards() {
        let searchParams = {
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            formatLegalityFilter: this.state.formatLegalityFilter
        };
        this.props.searchCards(searchParams);
    }

    render() {
        return (
            <Form className="searchBar">
                <SearchField label="Card name" placeholder="eg. Lightning Bolt" value={this.props.searchParams.searchText}
                             onUserInput={this.handleSearchTextInput}/>
                <SearchField label="Oracle text" placeholder="eg. Draw a card" value={this.props.searchParams.searchOracleText}
                             onUserInput={this.handleOracleUserInput}/>
                <SearchField label="Subtype" placeholder="eg. Goblin" value={this.props.searchParams.searchSubtypeText}
                             onUserInput={this.handleSubtypeUserInput}/>
                <LegalitySelector value={this.props.searchParams.formatLegalityFilter}
                                  onUserInput={this.handleFormatLegalityChange}/>
                <br/>
                {/*<ManaColorSelector manaParams={this.state.manaParams}
                 manaParamsInputCallback={this.handleManaParamsInput}/>
                 <br/>
                 Cards: {DeckUtils.getCardCount(this.props.deck)}
                 <br/>
                 <ExportButton onClick={this.props.downloadDeckCallback}/>*/}
            </Form>
        );
    }
}

SearchForm.propTypes = {
    searchCards: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    downloadDeckCallback: React.PropTypes.func.isRequired,
    searchParams: React.PropTypes.object.isRequired
};