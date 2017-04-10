import React from 'react';
import { TextArea, Form } from 'semantic-ui-react';

export default class EditableDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, data) {
        event.target.selectionEnd;
        this.props.deckListTextChanged(data.value);
    }

    render() {
        return (
            <div className="four wide column">
                <Form className="deckForm">
                    <TextArea value={this.props.deckListAsText} className="deckTextArea" onChange={this.onChange}/>
                </Form>
            </div>
        );
    }
}

EditableDeckList.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired
};