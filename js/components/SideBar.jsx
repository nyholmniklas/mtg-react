import React from 'react';
import Deck from './Deck.jsx';
import { Statistic, Container } from 'semantic-ui-react';

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Deck deckListAsText={this.props.deckListAsText}
                      deckListTextChanged={this.props.deckListTextChanged}/>
                <Statistic>
                    <Statistic.Value>{this.props.cardCount}</Statistic.Value>
                    <Statistic.Label>Cards</Statistic.Label>
                </Statistic>
            </Container>
        );
    }
}

SideBar.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired,
    cardCount: React.PropTypes.number
};