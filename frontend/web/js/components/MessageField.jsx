import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import '../../css/messages.sass';

export default class MessageField extends React.Component {

    render() {
        const messageComponents = this.props.messageList.map((messageId, index) =>
            <Message
                key={ index }
                text={ this.props.messages[messageId].text }
                sender={ this.props.messages[messageId].sender }
            />
        );

        return (
            <div className='messages-block'>
                <div className="messages-block__message-field">
                    { messageComponents }
                </div>
                <div className='messages-block__input-field' style={{ textAlign: 'center' }}>
                    <TextField
                        name = "input"
                        hintText = "Hint Text"
                        value = { this.props.input }
                        onChange = { this.props.handleInput }
                        onKeyUp = { this.props.handleKeyUp }
                    />
                    <FloatingActionButton
                        mini={ true }
                        style={{  }}
                        onClick={ this.props.handleSendMessage }
                    >
                        <SendIcon />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}