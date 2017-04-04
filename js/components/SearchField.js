import React from 'react'

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.searchField.value
        );
    }

    render() {
        return (
            <form>
                <input type="text" ref={(input) => {this.searchField = input;}} onChange={this.handleChange}
                       value={this.props.searchText}/>
            </form>
        )
    }
}

SearchField.propTypes = {
    searchText: React.PropTypes.string.isRequired,
    onUserInput: React.PropTypes.func
}

export default SearchField;