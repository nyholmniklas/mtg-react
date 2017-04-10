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
                <Input onChange={this.handleChange}
                       placeholder={this.props.placeholder}/>
            </Form.Field>
        );
    }
}

SearchField.propTypes = {
    searchText: React.PropTypes.string.isRequired,
    onUserInput: React.PropTypes.func
};