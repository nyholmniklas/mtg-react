import React from 'react';
import Deck from './Deck.jsx';
import { Statistic, Container } from 'semantic-ui-react';
import DeckUtils from './../libs/deckUtils.js';

export default class SideBar extends React.Component {
    render() {
        return (
            <Container className="sideBar">
                <Deck deckListAsText={this.props.deckListAsText}
                      deckListTextChanged={this.props.deckListTextChanged}/>
                <Statistic.Group widths='3'>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getCardCount(this.props.deck)}</Statistic.Value>
                        <Statistic.Label>Cards</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getLandCount(this.props.deck)}</Statistic.Value>
                        <Statistic.Label>Lands</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getLandCount(this.props.deck)}</Statistic.Value>
                        <Statistic.Label>Lands</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Container>
        );
    }
}

SideBar.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object
};