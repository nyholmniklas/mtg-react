import React from 'react';
import PropTypes from 'prop-types';
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
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onUserInput: PropTypes.func
};