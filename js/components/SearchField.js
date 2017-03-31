import React from 'react'

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.searchFieldValue
        );
    }

    render() {
        return (
            <form>
                <input type="text" ref={(input) => {this.searchFieldValue = input;}} onChange={this.handleChange}
                       value={this.props.searchText}/>
            </form>
        )
    }
}

export default SearchField;