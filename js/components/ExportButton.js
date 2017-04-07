import React from 'react'

export default class ExportButton extends React.Component {
    render() {
        var deck = this.props.deck;
        var downloadAsTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});
            var url = (window.webkitURL || window.URL).createObjectURL(data);
            //TODO check if element already exists and replace it
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = 'mydeck.txt';
            a.click();
        };
        var handleButtonClicked = function () {
            downloadAsTextFile(DeckUtils.getDeckAsText(deck));
        };
        return (
            <button onClick={handleButtonClicked}>Export Deck</button>
        )
    }
}

ExportButton.propTypes = {
    deck: React.PropTypes.object.isRequired
}