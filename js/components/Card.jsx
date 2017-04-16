import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

export default class Card extends React.Component {
    render() {
        let card = this.props.card;
        let callback = this.props.cardClickedCallback;
        let cardClicked = function () {
            callback(card);
        };
        return (
            <Image src={card.img_url} onClick={cardClicked} className="card-image" fluid/>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    cardClickedCallback: PropTypes.func
};