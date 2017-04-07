import React from 'react';

export default class ManaColorSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        var manaParams = {
            white: this.white.checked,
            blue: this.blue.checked,
            black: this.black.checked,
            red: this.red.checked,
            green: this.green.checked
        };
        this.props.manaParamsInputCallback(manaParams);
    }

    render() {
        return (
            <div>
                <input type="checkbox" ref={(white) => {this.white = white;}} checked={this.props.manaParams.white}
                       onChange={this.handleChange} value='W'/>
                <input type="checkbox" ref={(blue) => {this.blue = blue;}} checked={this.props.manaParams.blue}
                       onChange={this.handleChange} value='U'/>
                <input type="checkbox" ref={(black) => {this.black = black;}} checked={this.props.manaParams.black}
                       onChange={this.handleChange} value='B'/>
                <input type="checkbox" ref={(red) => {this.red = red;}} checked={this.props.manaParams.red}
                       onChange={this.handleChange} value='R'/>
                <input type="checkbox" ref={(green) => {this.green = green;}} checked={this.props.manaParams.green}
                       onChange={this.handleChange} value='G'/>
            </div>
        )
    }
}

ManaColorSelector.propTypes = {
    manaParams: React.PropTypes.object.isRequired,
    manaParamsInputCallback: React.PropTypes.func.isRequired
}