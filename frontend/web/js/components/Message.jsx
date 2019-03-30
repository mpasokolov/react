import React from 'react';
import '../../css/messages.sass';
import PropTypes from 'prop-types';

export default class Message extends React.Component {

    static propTypes = {
        sender: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className={ this.props.sender === 'bot' ? 'message message_bot' : 'message message_my' }>
                { this.props.text }
            </div>
        );
    }
}