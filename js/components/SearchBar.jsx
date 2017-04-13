import React from 'react';

import { Divider, Header, Icon, Container } from 'semantic-ui-react';

import SearchForm from '~/components/SearchForm/SearchForm.jsx';



export default class SearchBar extends React.Component {


    render() {
        return (
            <Container className="searchBar">
                <Header size="huge">
                    <Icon name="lab"/>
                    owlbrew.io
                </Header>
                <Divider/>
                <SearchForm searchCards={this.props.searchCards} searchParams={this.props.searchParams}/>
            </Container>
        );
    }
}

SearchBar.propTypes = {
    deck: React.PropTypes.object.isRequired,
    downloadDeckCallback: React.PropTypes.func.isRequired,
    searchCards: React.PropTypes.func.isRequired,
    searchParams: React.PropTypes.object.isRequired
};