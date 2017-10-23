import React from 'react';
import PropTypes from 'prop-types';
import { Image, Container } from 'semantic-ui-react';

export default class Card extends React.Component {
    getCardImages(card) {
        var cardImages = [];
        if (card.ammount === undefined) card.ammount = 1;
        for (var i = 0; i < card.ammount; i++) {
            let marginTop = '-19em';
            if (i === 0) marginTop = '0em';
            let style = {
                marginTop: marginTop
                //position: 'absolute',
                //'margin-top': offsetFromTop
            };
            var cardImage = (
                <Image
                    key={i}
                    src={card.image_uri}
                    style={style}
                    className="card-image"
                />
            );
            cardImages.push(cardImage);
        }
        return cardImages;
    }

    render() {
        let card = this.props.card;
        let callback = this.props.cardClickedCallback;
        let cardClicked = function() {
            callback(card);
        };
        let cardImages = this.getCardImages(card);
        return (
            <Container onClick={cardClicked} className="card-images" fluid>
                {cardImages}
            </Container>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    cardClickedCallback: PropTypes.func
};
