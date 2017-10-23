import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, data) {
        this.setState({
            value: data.value
        });
        this.props.onUserInput(data.value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.value !== nextState.value;
    }

    componentWillUpdate(nextProps) {
        if (
            this.props.id !== document.activeElement.id &&
            this.state.value !== nextProps.value
        ) {
            this.setState({ value: nextProps.value });
        }
    }

    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Input
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                >
                    <input id={this.props.id} />
                </Input>
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
