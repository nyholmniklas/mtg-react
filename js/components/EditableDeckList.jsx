import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Form, Container } from 'semantic-ui-react';

/**
 * Stateful input. This component is a mess mostly because of a problem
 * with carriage position when updating in a controlled way.
 */
export default class EditableDeckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, data) {
        this.setState({
            value: data.value
        });
        this.props.deckListTextChanged(data.value);
    }

    componentWillUpdate(nextProps) {
        if (this.props.id !== document.activeElement.id && this.state.value !== nextProps.deckListAsText) {
            this.setState({value: nextProps.deckListAsText});
        }
    }

    render() {
        return (
            <Container className="deckFormContainer">
                <Form className="deckForm">
                    <TextArea id={this.props.id} value={this.state.value} className="deckTextArea"
                              onChange={this.onChange}/>
                </Form>
            </Container>
        );
    }
}

EditableDeckList.propTypes = {
    id: PropTypes.string.isRequired,
    deckListAsText: PropTypes.string.isRequired,
    deckListTextChanged: PropTypes.func.isRequired
};