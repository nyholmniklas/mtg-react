import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import {formatOptions} from './../constants/formats.js';

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
            <Dropdown fluid selection value={this.props.value} options={formatOptions} onChange={this.handleChange}/>
        );
    }
}

LegalitySelector.propTypes = {
    onUserInput: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
};