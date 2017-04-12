import React from 'react';
import { TextArea, Form } from 'semantic-ui-react';

/**
 * Stateful input. This component is a mess mostly because of a problem
 * with carriage position when updating in a controlled way.
 */
export default class EditableDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, data) {
        window.clearTimeout(this._timer);
        this.setState({
            value: data.value
        });
        this.props.deckListTextChanged(data.value);
    }

    componentWillReceiveProps(nextProps) {
        if (this._timer) {
            window.clearTimeout(this._timer);
            this._timer = null;
        }
        this._timer = window.setTimeout(function () {
            if (this.state.value !== nextProps.deckListAsText) {
                this.setState({value: nextProps.deckListAsText});
            }
        }.bind(this), 100);
    }

    render() {
        return (
            <Form className="deckForm">
                <TextArea value={this.state.value} className="deckTextArea" onChange={this.onChange}/>
            </Form>
        );
    }
}

EditableDeckList.propTypes = {
    deckListAsText: React.PropTypes.string.isRequired,
    deckListTextChanged: React.PropTypes.func.isRequired
};