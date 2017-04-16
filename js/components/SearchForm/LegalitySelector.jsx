import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown , Form} from 'semantic-ui-react';

import {formatOptions} from '~/constants/formats.js';

export default class LegalitySelector extends React.Component {
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
                <label>Format</label>
                <Dropdown fluid selection value={this.props.value} options={formatOptions}
                          onChange={this.handleChange}/>
            </Form.Field>
        );
    }
}

LegalitySelector.propTypes = {
    onUserInput: PropTypes.func.isRequired,
    value: PropTypes.string
};