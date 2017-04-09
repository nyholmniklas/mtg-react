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
                    <TextArea className="deckTextArea" onChange={this.onChange}/>
                </Form>
            </div>
        );
    }
}

EditableDeckList.propTypes = {
    deckListTextChanged: React.PropTypes.func.isRequired
};