var Deck = React.createClass({
    render: function () {
        return (
            <div className="deck">
                <Cards cards={this.props.cards}/>
            </div>
        )
    }
});