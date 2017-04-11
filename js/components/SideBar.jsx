import React from 'react';
import Deck from './Deck.jsx';

export default class SideBar extends React.Component {
    render() {
        return (
            <Deck deckListAsText={this.props.deckListAsText}
                  deckListTextChanged={this.props.deckListTextChanged}/>
        );
    }
}

SideBar.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired
};