import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { Form } from 'semantic-ui-react';
import update from 'react-addons-update';

import SearchField from '~/components/SearchForm/SearchField.jsx';
import LegalitySelector from '~/components/SearchForm/LegalitySelector.jsx';
//import ManaColorSelector from '~/components/SearchForm/ManaColorSelector.jsx';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.searchParams;
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.handleOracleUserInput = this.handleOracleUserInput.bind(this);
        this.handleTypeUserInput = this.handleTypeUserInput.bind(this);
        this.handleSubtypeUserInput = this.handleSubtypeUserInput.bind(this);
        this.handleManaParamsInput = this.handleManaParamsInput.bind(this);
        this.handleFormatLegalityChange = this.handleFormatLegalityChange.bind(this);
        this.searchCards =     this.searchCards.bind(this);
        this.triggerSearch = _.debounce(this.searchCards, 500).bind(this);
    }

    handleSearchTextInput(searchText) {
        this.setState(update(this.state, {
            searchText: {$set: searchText}
        }), this.triggerSearch);
    }

    handleOracleUserInput(oracleSearchText) {
        this.setState(update(this.state, {
            searchOracleText: {$set: oracleSearchText}
        }), this.triggerSearch);
    }

    handleTypeUserInput(typeSearchText) {
        this.setState(update(this.state, {
            searchTypeText: {$set: typeSearchText}
        }), this.triggerSearch);
    }

    handleSubtypeUserInput(subtypeSearchText) {
        this.setState(update(this.state, {
            searchSubtypeText: {$set: subtypeSearchText}
        }), this.triggerSearch);
    }

    handleManaParamsInput(manaParams) {
        this.setState(update(this.state, {
            manaParams: {$set: manaParams}
        }), this.triggerSearch);
    }

    handleFormatLegalityChange(formatLegalityFilter) {
        this.setState(update(this.state, {
            formatLegalityFilter: {$set: formatLegalityFilter}
        }), this.triggerSearch);
    }

    searchCards() {
        let searchParams = {
            searchText: this.state.searchText,
            searchOracleText: this.state.searchOracleText,
            searchTypeText: this.state.searchTypeText,
            searchSubtypeText: this.state.searchSubtypeText,
            manaParams: this.state.manaParams,
            formatLegalityFilter: this.state.formatLegalityFilter
        };
        this.props.searchCards(searchParams);
    }

    render() {
        return (
            <Form>

                <SearchField id="search-card-name" label="Card name" placeholder="eg. Lightning Bolt"
                             value={this.props.searchParams.searchText}
                             onUserInput={this.handleSearchTextInput}/>
                <SearchField id="oracle-card-name" label="Oracle text" placeholder="eg. Draw a card"
                             value={this.props.searchParams.searchOracleText}
                             onUserInput={this.handleOracleUserInput}/>
                <SearchField id="type-card-name" label="Type" placeholder="eg. Creature"
                             value={this.props.searchParams.searchTypeText}
                             onUserInput={this.handleTypeUserInput}/>
                <SearchField id="subtype-card-name" label="Subtype" placeholder="eg. Goblin"
                             value={this.props.searchParams.searchSubtypeText}
                             onUserInput={this.handleSubtypeUserInput}/>
                <LegalitySelector value={this.props.searchParams.formatLegalityFilter}
                                  onUserInput={this.handleFormatLegalityChange}/>
                <br/>
                {/*<ManaColorSelector manaParams={this.state.manaParams}
                 manaParamsInputCallback={this.handleManaParamsInput}/>

                 <ExportButton onClick={this.props.downloadDeckCallback}/>*/}
            </Form>
        );
    }
}

SearchForm.propTypes = {
    searchCards: PropTypes.func.isRequired,
    searchParams: PropTypes.object.isRequired
};