import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Header, Icon, Container } from 'semantic-ui-react';

import SearchForm from '~/components/SearchForm/SearchForm.jsx';



export default class SearchBar extends React.Component {


    render() {
        return (
            <Container className="searchBar">
                <Header size="huge">
                    <Icon size='small' name="lab"/>
                    owlbrew.io
                </Header>
                <Divider/>
                <SearchForm searchCards={this.props.searchCards} searchParams={this.props.searchParams}/>
            </Container>
        );
    }
}

SearchBar.propTypes = {
    deck: PropTypes.object.isRequired,
    downloadDeckCallback: PropTypes.func.isRequired,
    searchCards: PropTypes.func.isRequired,
    searchParams: PropTypes.object.isRequired
};