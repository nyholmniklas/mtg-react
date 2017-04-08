import React from 'react';
import DeckUtils from './../util/DeckUtils';
import { TextArea, Form } from 'semantic-ui-react';

export default class EditableDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.getDeckAsText = this.getDeckAsText.bind(this);
    }

    getDeckAsText() {
        let deck = this.props.deck;
        if (deck === undefined) {
            return '';
        }
        return DeckUtils.getDeckAsText(deck);
    }

    render() {
        let value = this.getDeckAsText();
        return (
            <Form>
                <TextArea value={value}/>
            </Form>
        );
    }
}

EditableDeckList.propTypes = {
    deck: React.PropTypes.object
};