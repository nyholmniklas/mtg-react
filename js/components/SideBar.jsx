import React from 'react';
import { Statistic, Container, Grid, Menu } from 'semantic-ui-react';

import DeckUtils from '~/libs/deckUtils.js';
import CardType from '~/constants/cardTypes.js';

import Deck from '~/components/Deck.jsx';

export default class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.handleMenuChange = this.handleMenuChange.bind(this);
    }

    handleMenuChange(e, { name }) {
        this.props.setMainAreaContent(name);
    }

    render() {
        return (
            <Container className="sideBar">
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular='right'>
                        <Menu.Item name='search' active={this.props.mainAreaContent === 'search'}
                                   onClick={this.handleMenuChange}/>
                        <Menu.Item name='stats' active={this.props.mainAreaContent === 'stats'}
                                   onClick={this.handleMenuChange}/>
                        <Menu.Item name='visual-deck' active={this.props.mainAreaContent === 'visual-deck'}
                                   onClick={this.handleMenuChange}/>
                    </Menu>
                </Grid.Column>
                <br/>
                <Deck deckListAsText={this.props.deckListAsText}
                      deckListTextChanged={this.props.deckListTextChanged}/>
                <br/>
                <Statistic.Group widths='3'>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getCardCount(this.props.deck)}</Statistic.Value>
                        <Statistic.Label>Cards</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getTypeCount(this.props.deck, CardType.Land)}</Statistic.Value>
                        <Statistic.Label>Lands</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{DeckUtils.getTypeCount(this.props.deck, CardType.Creature)}</Statistic.Value>
                        <Statistic.Label>Creatures</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Container>
        );
    }
}

SideBar.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    mainAreaContent: React.PropTypes.string.isRequired,
    setMainAreaContent: React.PropTypes.func.isRequired
};