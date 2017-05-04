import React from 'react';
import PropTypes from 'prop-types';
import { Line, LineChart} from 'recharts';

export default class Stats extends React.Component {
    render() {
        return (
            <LineChart width={400} height={400} data={this.props.deck.cards}>
                <Line type="monotone" dataKey="cmc" stroke="#8884d8"/>
            </LineChart>
        );
    }
}

Stats.propTypes = {
    deck: PropTypes.object.isRequired
};