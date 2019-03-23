import React from 'react';

export default class Message extends React.Component {

    render() {
        return (
            <div className='message'>
                <div className={ this.props.sender === 'bot' ? 'message__bot' : 'message__my' }>
                    { this.props.text }
                </div>
            </div>
        );
    }
}