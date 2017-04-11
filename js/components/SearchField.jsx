import React from 'react';
import { Input, Form } from 'semantic-ui-react';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, data) {
        this.props.onUserInput(
            data.value
        );
    }

    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Input value={this.props.value} onChange={this.handleChange}
                       placeholder={this.props.placeholder}/>
            </Form.Field>
        );
    }
}

SearchField.propTypes = {
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onUserInput: React.PropTypes.func
};